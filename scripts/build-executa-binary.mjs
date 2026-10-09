import { chmod, mkdir, readFile, writeFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';
import { create as createTar } from 'tar';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const executaRoot = join(root, 'executas', 'ghostwriter');
const config = JSON.parse(await readFile(join(executaRoot, 'executa.json'), 'utf8'));
const platform = 'linux-x86_64';
const artifactConfig = config.distribution?.binary_artifacts?.[platform];

if (!artifactConfig || config.distribution.type !== 'binary') {
  throw new Error(`No binary artifact is configured for ${platform} in executa.json`);
}

const artifactPath = resolve(executaRoot, artifactConfig.path);
const stageRoot = join(executaRoot, 'dist', 'binary-stage');
const stageBin = join(stageRoot, 'bin');
const executableName = 'ghostwriter-ai-executa';
const executablePath = join(stageBin, executableName);
const bundlePath = join(executaRoot, 'dist', 'ghostwriter-ai-executa.cjs');
const pkgCli = join(root, 'node_modules', '@yao-pkg', 'pkg', 'lib-es5', 'bin.js');
const protocolManifest = {
  name: config.slug,
  version: config.version,
  runtime: {
    binary: {
      entrypoint: artifactConfig.entrypoint,
      permissions: {
        [artifactConfig.entrypoint]: '0o755',
      },
    },
  },
};

await mkdir(stageBin, { recursive: true });
await mkdir(dirname(artifactPath), { recursive: true });
await mkdir(dirname(bundlePath), { recursive: true });

await build({
  entryPoints: [join(executaRoot, 'plugin.mjs')],
  bundle: true,
  platform: 'node',
  target: 'node22',
  format: 'cjs',
  outfile: bundlePath,
});

execFileSync(process.execPath, [
  pkgCli,
  bundlePath,
  '--target',
  'node22-linux-x64',
  '--output',
  executablePath,
], { cwd: root, stdio: 'inherit' });

await chmod(executablePath, 0o755);
await writeFile(join(stageRoot, 'manifest.json'), `${JSON.stringify(protocolManifest, null, 2)}\n`);
await createTar({
  cwd: stageRoot,
  file: artifactPath,
  gzip: true,
  portable: true,
  mtime: new Date('2020-01-01T00:00:00.000Z'),
  onWriteEntry(entry) {
    if (entry.path !== artifactConfig.entrypoint) return;
    const fixedTimestamp = new Date('2020-01-01T00:00:00.000Z');
    entry.portable = false;
    entry.stat.mode = 0o100755;
    entry.stat.uid = 0;
    entry.stat.gid = 0;
    entry.stat.atime = fixedTimestamp;
    entry.stat.ctime = fixedTimestamp;
    entry.stat.dev = 0;
    entry.stat.ino = 0;
    entry.stat.nlink = 1;
  },
}, ['bin/ghostwriter-ai-executa', 'manifest.json']);

console.log(`Built ${resolve(artifactPath)}`);

import { Toolbar } from './Toolbar';
import { LoadingOverlay } from './LoadingOverlay';
import type { ExportFormat } from '../services/exportDocument';

interface EditorProps {
  title: string;
  content: string;
  busy: boolean;
  saving: boolean;
  onTitleChange: (title: string) => void;
  onContentChange: (content: string) => void;
  onCopy: () => void;
  onExport: (format: ExportFormat) => void | Promise<void>;
}

export function Editor({ title, content, busy, saving, onTitleChange, onContentChange, onCopy, onExport }: EditorProps) {
  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;

  return (
    <section className="editor-panel" aria-label="Writing editor">
      <Toolbar
        generating={busy}
        hasContent={Boolean(content.trim())}
        onCopy={onCopy}
        onExport={onExport}
        saving={saving}
        wordCount={wordCount}
      />
      <div className="document-heading">
        <input aria-label="Document title" onChange={(event) => onTitleChange(event.target.value)} value={title} />
        <span>Markdown</span>
      </div>
      <textarea
        aria-label="Document content"
        className="document-editor"
        onChange={(event) => onContentChange(event.target.value)}
        placeholder="Your words will take shape here…"
        spellCheck
        value={content}
      />
      <LoadingOverlay active={busy && !content} label="Preparing your draft" />
    </section>
  );
}
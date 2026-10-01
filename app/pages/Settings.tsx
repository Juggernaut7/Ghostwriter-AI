import { Check, Cloud, Fingerprint } from 'lucide-react';
import { useState } from 'react';
import ghostwriterLogo from '../../src/assets/logo.png';

interface SettingsProps {
  connected: boolean;
  initialSamples: string;
  onSaveSamples: (samples: string) => Promise<boolean>;
}

export function Settings({ connected, initialSamples, onSaveSamples }: SettingsProps) {
  const [samples, setSamples] = useState(initialSamples);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function saveSamples() {
    setSaving(true);
    setSaved(false);
    try {
      setSaved(await onSaveSamples(samples));
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="settings-page">
      <header className="page-intro">
        <div className="settings-header-brand">
          <img src={ghostwriterLogo} alt="" aria-hidden="true" className="settings-brand-mark" />
          <div>
            <p className="eyebrow">WORKSPACE PREFERENCES</p>
            <h1>Settings</h1>
          </div>
        </div>
        <p className="intro">Keep your writing environment and voice close to how you work.</p>
      </header>
      <section className="settings-section">
        <div className="settings-icon"><Fingerprint aria-hidden="true" size={18} /></div>
        <div className="settings-copy">
          <h2>Your writing voice</h2>
          <p>Save a few representative samples. They will be available as voice notes in new drafts and emails.</p>
          <label className="form-field" htmlFor="voice-samples"><span>Writing samples</span><textarea id="voice-samples" onChange={(event) => setSamples(event.target.value)} placeholder="Paste a few examples of your writing…" rows={8} value={samples} /></label>
          <button className="secondary-button" disabled={!connected || saving} onClick={() => void saveSamples()} type="button">
            {saved ? <Check size={15} /> : null}{saving ? 'Saving…' : saved ? 'Saved to Anna' : 'Save voice samples'}
          </button>
          {!connected && <p className="form-note">Connect through Anna to save your voice profile.</p>}
        </div>
      </section>
      <section className="settings-section connection-section">
        <div className="settings-icon"><Cloud aria-hidden="true" size={18} /></div>
        <div className="settings-copy"><h2>Anna services</h2><p>{connected ? 'Native model and per-user document storage are connected.' : 'Anna model and persistent storage are unavailable in browser preview.'}</p><span className={`connection-badge${connected ? ' is-connected' : ''}`}><span />{connected ? 'Connected' : 'Not connected'}</span></div>
      </section>
    </div>
  );
}
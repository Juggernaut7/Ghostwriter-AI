import { useState } from 'react';
import { Check, Clipboard, Download, LoaderCircle } from 'lucide-react';
import type { ExportFormat } from '../services/exportDocument';

interface ToolbarProps {
  wordCount: number;
  saving: boolean;
  generating: boolean;
  hasContent: boolean;
  onCopy: () => void;
  onExport: (format: ExportFormat) => void | Promise<void>;
}

export function Toolbar({ wordCount, saving, generating, hasContent, onCopy, onExport }: ToolbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="editor-toolbar">
      <div className="toolbar-status" aria-live="polite">
        {generating ? <LoaderCircle className="spin" aria-hidden="true" size={14} /> : saving ? <LoaderCircle className="spin" aria-hidden="true" size={14} /> : <Check aria-hidden="true" size={14} />}
        <span>{generating ? 'Generating' : saving ? 'Saving' : 'Autosaved'}</span>
      </div>
      <div className="toolbar-actions">
        <span className="word-count">{wordCount} words</span>
        <button aria-label="Copy document" className="icon-button" disabled={!hasContent} onClick={onCopy} title="Copy" type="button"><Clipboard size={15} /></button>
        <div className="export-control">
          <button aria-expanded={menuOpen} aria-label="Export document" className="icon-button" disabled={!hasContent} onClick={() => setMenuOpen((open) => !open)} title="Export" type="button"><Download size={15} /></button>
          {menuOpen && (
            <div className="export-menu" role="menu" aria-label="Export format">
              {(['md', 'txt', 'pdf'] as const).map((format) => (
                <button key={format} onClick={() => { void onExport(format); setMenuOpen(false); }} role="menuitem" type="button">
                  {format === 'md' ? 'Markdown' : format.toUpperCase()}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
import { FileText } from 'lucide-react';
import type { WritingDocument } from '../types/domain';

interface HistoryPanelProps {
  documents: WritingDocument[];
  onOpenDocument: (document: WritingDocument) => void;
}

export function HistoryPanel({ documents, onOpenDocument }: HistoryPanelProps) {
  const recentDocuments = documents.slice(0, 6);

  return (
    <section className="history-panel" aria-label="Recent documents">
      <div className="history-heading">RECENT</div>
      {recentDocuments.length ? recentDocuments.map((document) => (
        <button className="history-item" key={document.id} onClick={() => onOpenDocument(document)} type="button">
          <FileText aria-hidden="true" size={14} />
          <span>{document.title || 'Untitled document'}</span>
        </button>
      )) : <p className="history-empty">Your drafts will live here.</p>}
    </section>
  );
}
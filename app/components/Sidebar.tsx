import { BookOpenText, FileText, LayoutDashboard, Mail, PenLine, Settings2, WandSparkles } from 'lucide-react';
import { HistoryPanel } from './HistoryPanel';
import type { PageId, WritingDocument } from '../types/domain';

interface SidebarProps {
  activePage: PageId;
  connectionReady: boolean;
  documents: WritingDocument[];
  onNavigate: (page: PageId) => void;
  onOpenDocument: (document: WritingDocument) => void;
}

const navigation = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'draft', label: 'Draft Studio', icon: PenLine },
  { id: 'rewrite', label: 'Rewrite Lab', icon: WandSparkles },
  { id: 'thread', label: 'Thread Architect', icon: BookOpenText },
  { id: 'summarize', label: 'Summarize', icon: FileText },
  { id: 'email', label: 'Email', icon: Mail },
  { id: 'settings', label: 'Settings', icon: Settings2 },
] as const;

export function Sidebar({ activePage, connectionReady, documents, onNavigate, onOpenDocument }: SidebarProps) {
  return (
    <aside className="sidebar">
      <a className="brand" href="#dashboard" onClick={(event) => { event.preventDefault(); onNavigate('dashboard'); }}>
        <span className="brand-mark">G</span>
        <span>ghostwriter<span className="brand-ai">.ai</span></span>
      </a>
      <div className="workspace-label">WORKSPACE</div>
      <nav className="main-navigation" aria-label="Main navigation">
        {navigation.map(({ id, label, icon: Icon }) => (
          <button className={`nav-item${activePage === id ? ' is-active' : ''}`} key={id} onClick={() => onNavigate(id)} type="button">
            <Icon aria-hidden="true" size={17} strokeWidth={1.8} />
            <span>{label}</span>
          </button>
        ))}
      </nav>
      <HistoryPanel documents={documents} onOpenDocument={onOpenDocument} />
      <div className="sidebar-footer">
        <span className={`status-dot${connectionReady ? '' : ' is-offline'}`} />
        <span>{connectionReady ? 'Anna connected' : 'Preview mode'}</span>
        <span className="plan-label">BETA</span>
      </div>
    </aside>
  );
}
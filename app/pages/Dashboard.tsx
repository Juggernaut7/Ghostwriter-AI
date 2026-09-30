import { ArrowRight, BookOpenText, FileText, Mail, PenLine, WandSparkles } from 'lucide-react';
import type { WorkflowId, WritingDocument } from '../types/domain';

interface DashboardProps {
  documents: WritingDocument[];
  onCreate: (workflow: WorkflowId) => void;
  onOpen: (document: WritingDocument) => void;
}

const actions: Array<{ id: WorkflowId; title: string; detail: string; icon: typeof PenLine }> = [
  { id: 'draft', title: 'Start a draft', detail: 'Build from a focused brief', icon: PenLine },
  { id: 'rewrite', title: 'Rewrite', detail: 'Give rough writing a sharper edge', icon: WandSparkles },
  { id: 'thread', title: 'Architect a thread', detail: 'Turn one idea into a narrative', icon: BookOpenText },
  { id: 'summarize', title: 'Summarize', detail: 'Pull the signal from long text', icon: FileText },
  { id: 'email', title: 'Write an email', detail: 'Find the right words and tone', icon: Mail },
];

export function Dashboard({ documents, onCreate, onOpen }: DashboardProps) {
  return (
    <div className="dashboard-page">
      <section className="welcome-block">
        <p className="eyebrow">YOUR WRITING DESK</p>
        <h1>Make something<br />worth reading.</h1>
        <p className="intro">A clear path from the first rough thought to the final, ready-to-publish draft.</p>
      </section>
      <section className="workflow-section" aria-labelledby="workflow-heading">
        <div className="section-heading">
          <div><p className="eyebrow">CHOOSE YOUR NEXT MOVE</p><h2 id="workflow-heading">Writing workflows</h2></div>
          <span className="section-count">{actions.length} WORKFLOWS</span>
        </div>
        <div className="workflow-list">
          {actions.map(({ id, title, detail, icon: Icon }, index) => (
            <button className="workflow-row" key={id} onClick={() => onCreate(id)} type="button">
              <span className="workflow-index">0{index + 1}</span>
              <span className="workflow-icon"><Icon aria-hidden="true" size={17} /></span>
              <span className="workflow-copy"><strong>{title}</strong><small>{detail}</small></span>
              <ArrowRight aria-hidden="true" className="workflow-arrow" size={16} />
            </button>
          ))}
        </div>
      </section>
      <section className="recent-section" aria-labelledby="recent-heading">
        <div className="section-heading"><div><p className="eyebrow">PICK UP WHERE YOU LEFT OFF</p><h2 id="recent-heading">Recent documents</h2></div><span className="section-count">{documents.length} SAVED</span></div>
        {documents.length ? (
          <div className="dashboard-documents">
            {documents.slice(0, 4).map((document) => (
              <button className="dashboard-document" key={document.id} onClick={() => onOpen(document)} type="button">
                <span><strong>{document.title || 'Untitled document'}</strong><small>{document.workflow} · {new Date(document.updatedAt).toLocaleDateString()}</small></span>
                <ArrowRight aria-hidden="true" size={15} />
              </button>
            ))}
          </div>
        ) : <p className="empty-note">Your first piece starts with an idea. Choose a workflow above.</p>}
      </section>
    </div>
  );
}
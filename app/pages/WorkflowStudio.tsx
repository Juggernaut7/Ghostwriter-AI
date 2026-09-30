import { Editor } from '../components/Editor';
import { PromptForm } from '../components/PromptForm';
import type { WorkflowConfig } from '../config/workflows';
import type { ExportFormat } from '../services/exportDocument';
import type { WorkflowValues, WritingDocument } from '../types/domain';

interface WorkflowStudioProps {
  workflow: WorkflowConfig;
  document: WritingDocument;
  values: WorkflowValues;
  connected: boolean;
  busy: boolean;
  saving: boolean;
  onValuesChange: (key: string, value: string) => void;
  onGenerate: () => void;
  onTitleChange: (title: string) => void;
  onContentChange: (content: string) => void;
  onCopy: () => void;
  onExport: (format: ExportFormat) => void | Promise<void>;
}

export function WorkflowStudio(props: WorkflowStudioProps) {
  const { workflow, document, values, connected, busy, saving, onValuesChange, onGenerate, onTitleChange, onContentChange, onCopy, onExport } = props;

  return (
    <div className="workflow-studio">
      <header className="page-intro">
        <p className="eyebrow">WORKFLOW / {workflow.id.toUpperCase()}</p>
        <h1>{workflow.title}</h1>
        <p className="intro">{workflow.description}</p>
      </header>
      <div className="studio-layout">
        <section className="prompt-panel" aria-labelledby="brief-heading">
          <h2 id="brief-heading">Your brief</h2>
          <p>Give the work enough context to make the first draft useful.</p>
          <PromptForm fields={workflow.fields} values={values} busy={busy} connected={connected} onChange={onValuesChange} onSubmit={onGenerate} />
        </section>
        <Editor title={document.title} content={document.content} busy={busy} saving={saving} onTitleChange={onTitleChange} onContentChange={onContentChange} onCopy={onCopy} onExport={onExport} />
      </div>
    </div>
  );
}
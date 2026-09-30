import { ArrowRight, Sparkles } from 'lucide-react';
import type { WorkflowField, WorkflowValues } from '../types/domain';

interface PromptFormProps {
  fields: WorkflowField[];
  values: WorkflowValues;
  busy: boolean;
  connected: boolean;
  onChange: (key: string, value: string) => void;
  onSubmit: () => void;
}

export function PromptForm({ fields, values, busy, connected, onChange, onSubmit }: PromptFormProps) {
  const primaryField = fields.find((field) => field.multiline) ?? fields[0];
  const otherFields = fields.filter((field) => field !== primaryField);

  return (
    <form className="prompt-form" onSubmit={(event) => { event.preventDefault(); onSubmit(); }}>
      {primaryField && (
        <label className="form-field form-field-primary" htmlFor={`field-${primaryField.key}`}>
          <span>{primaryField.label}</span>
          <textarea
            autoFocus
            id={`field-${primaryField.key}`}
            onChange={(event) => onChange(primaryField.key, event.target.value)}
            placeholder={primaryField.placeholder}
            required={['topic', 'text', 'idea', 'goal'].includes(primaryField.key)}
            rows={4}
            value={values[primaryField.key] ?? ''}
          />
        </label>
      )}
      <div className="form-grid">
        {otherFields.map((field) => (
          <label className="form-field" htmlFor={`field-${field.key}`} key={field.key}>
            <span>{field.label}</span>
            {field.multiline ? (
              <textarea id={`field-${field.key}`} onChange={(event) => onChange(field.key, event.target.value)} placeholder={field.placeholder} rows={3} value={values[field.key] ?? ''} />
            ) : (
              <input id={`field-${field.key}`} onChange={(event) => onChange(field.key, event.target.value)} placeholder={field.placeholder} value={values[field.key] ?? ''} />
            )}
          </label>
        ))}
      </div>
      <button className="primary-button generate-button" disabled={busy || !connected} type="submit">
        <Sparkles aria-hidden="true" size={16} />
        {busy ? 'Writing…' : 'Generate'}
        {!busy && <ArrowRight aria-hidden="true" size={15} />}
      </button>
      {!connected && <p className="form-note">Open Ghostwriter AI inside Anna to generate with its native model.</p>}
    </form>
  );
}
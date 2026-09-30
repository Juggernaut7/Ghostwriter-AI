import { AlertCircle, CheckCircle2, Info } from 'lucide-react';

export type ToastTone = 'success' | 'error' | 'info';

interface ToastProps {
  message: string;
  tone: ToastTone;
}

const icons = { success: CheckCircle2, error: AlertCircle, info: Info };

export function Toast({ message, tone }: ToastProps) {
  if (!message) return null;
  const Icon = icons[tone];

  return (
    <div className={`toast toast-${tone}`} role={tone === 'error' ? 'alert' : 'status'}>
      <Icon aria-hidden="true" size={17} />
      <span>{message}</span>
    </div>
  );
}
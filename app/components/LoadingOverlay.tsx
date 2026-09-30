import { LoaderCircle } from 'lucide-react';

interface LoadingOverlayProps {
  active: boolean;
  label: string;
}

export function LoadingOverlay({ active, label }: LoadingOverlayProps) {
  if (!active) return null;
  return (
    <div className="loading-overlay" role="status">
      <LoaderCircle className="spin" aria-hidden="true" size={21} />
      <span>{label}</span>
    </div>
  );
}
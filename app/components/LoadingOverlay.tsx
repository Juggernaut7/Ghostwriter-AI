import { LoaderCircle } from 'lucide-react';
import { GHOSTWRITER_LOGO } from '../assets/brand';

interface LoadingOverlayProps {
  active: boolean;
  label: string;
}

export function LoadingOverlay({ active, label }: LoadingOverlayProps) {
  if (!active) return null;
  return (
    <div className="loading-overlay" role="status">
      <img src={GHOSTWRITER_LOGO} alt="" aria-hidden="true" className="loading-mark" />
      <LoaderCircle className="spin" aria-hidden="true" size={20} />
      <span>{label}</span>
    </div>
  );
}
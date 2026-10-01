import { LoaderCircle } from 'lucide-react';
import ghostwriterLogo from '../../src/assets/logo.png';

interface LoadingOverlayProps {
  active: boolean;
  label: string;
}

export function LoadingOverlay({ active, label }: LoadingOverlayProps) {
  if (!active) return null;
  return (
    <div className="loading-overlay" role="status">
      <img src={ghostwriterLogo} alt="" aria-hidden="true" className="loading-mark" />
      <LoaderCircle className="spin" aria-hidden="true" size={20} />
      <span>{label}</span>
    </div>
  );
}
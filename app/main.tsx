import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import '@fontsource/dm-sans/400.css';
import '@fontsource/dm-sans/500.css';
import '@fontsource/dm-sans/600.css';
import '@fontsource/dm-sans/700.css';
import '@fontsource/dm-mono/400.css';
import '@fontsource/dm-mono/500.css';
import '@fontsource/newsreader/400.css';
import '@fontsource/newsreader/500.css';
import '@fontsource/newsreader/600.css';
import './styles/global.css';

async function loadAnnaToolIds() {
  if (window.parent === window || window.__ANNA_TOOL_IDS__) return;

  await new Promise<void>((resolve) => {
    const sidecar = document.createElement('script');
    sidecar.src = new URL('./anna-tool-ids.js', document.baseURI).toString();
    sidecar.onload = () => resolve();
    sidecar.onerror = () => resolve();
    document.head.append(sidecar);
  });
}

function renderApp() {
  const rootElement = document.getElementById('root');

  if (!rootElement) {
    throw new Error('Root element #root was not found.');
  }

  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}

void loadAnnaToolIds().then(renderApp);
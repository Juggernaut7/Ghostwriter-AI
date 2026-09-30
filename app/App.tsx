import { useEffect, useRef, useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Toast, type ToastTone } from './components/Toast';
import { workflows } from './config/workflows';
import { Dashboard } from './pages/Dashboard';
import { Settings } from './pages/Settings';
import { WorkflowStudio } from './pages/WorkflowStudio';
import { connectAnna, type AnnaRuntime } from './platform/anna';
import { generateCompletion } from './services/completion';
import { loadDocuments, saveDocuments } from './services/documents';
import { exportDocument as downloadDocument, type ExportFormat } from './services/exportDocument';
import type { PageId, WorkflowId, WorkflowValues, WritingDocument } from './types/domain';

const VOICE_KEY = 'ghostwriter-ai:voice-profile:v1';

interface Notification {
  message: string;
  tone: ToastTone;
}

function readValue(result: unknown): unknown {
  if (result && typeof result === 'object' && 'value' in result) return result.value;
  return result;
}

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'Something went wrong. Please try again.';
}

export function App() {
  const [activePage, setActivePage] = useState<PageId>('dashboard');
  const [anna, setAnna] = useState<AnnaRuntime | null>(null);
  const [storageReady, setStorageReady] = useState(false);
  const [documents, setDocuments] = useState<WritingDocument[]>([]);
  const [currentDocument, setCurrentDocument] = useState<WritingDocument | null>(null);
  const [values, setValues] = useState<WorkflowValues>({});
  const [voiceSamples, setVoiceSamples] = useState('');
  const [generating, setGenerating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState<Notification | null>(null);
  const documentsRef = useRef<WritingDocument[]>([]);

  useEffect(() => {
    let mounted = true;
    void (async () => {
      const runtime = await connectAnna();
      if (!mounted) return;
      setAnna(runtime);
      if (!runtime) {
        setStorageReady(true);
        return;
      }
      try {
        const [savedDocuments, savedVoice] = await Promise.all([
          loadDocuments(runtime),
          runtime.storage.get({ key: VOICE_KEY }),
        ]);
        if (!mounted) return;
        const orderedDocuments = [...savedDocuments].sort((left, right) => right.updatedAt.localeCompare(left.updatedAt));
        documentsRef.current = orderedDocuments;
        setDocuments(orderedDocuments);
        const profile = readValue(savedVoice);
        if (typeof profile === 'string') setVoiceSamples(profile);
      } catch (error) {
        setNotification({ message: `Anna storage could not be loaded: ${errorMessage(error)}`, tone: 'error' });
      } finally {
        if (mounted) setStorageReady(true);
      }
    })();
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    if (!notification) return undefined;
    const timer = window.setTimeout(() => setNotification(null), 4200);
    return () => window.clearTimeout(timer);
  }, [notification]);

  useEffect(() => {
    if (!anna || !storageReady || !currentDocument) return undefined;
    setSaving(true);
    const timer = window.setTimeout(() => {
      const updatedDocument = { ...currentDocument, updatedAt: new Date().toISOString() };
      const nextDocuments = [updatedDocument, ...documentsRef.current.filter((item) => item.id !== updatedDocument.id)];
      documentsRef.current = nextDocuments;
      setDocuments(nextDocuments);
      void saveDocuments(anna, nextDocuments).then(() => setSaving(false)).catch((error: unknown) => {
        setSaving(false);
        setNotification({ message: `Document could not be saved: ${errorMessage(error)}`, tone: 'error' });
      });
    }, 650);
    return () => window.clearTimeout(timer);
  }, [anna, currentDocument, storageReady]);

  function startWorkflow(workflow: WorkflowId) {
    const now = new Date().toISOString();
    const nextDocument: WritingDocument = {
      id: crypto.randomUUID(),
      title: `Untitled ${workflows[workflow].title}`,
      workflow,
      content: '',
      createdAt: now,
      updatedAt: now,
    };
    setCurrentDocument(nextDocument);
    setValues({ voice: voiceSamples, ...(workflow === 'thread' ? { targetCount: '8' } : {}) });
    setActivePage(workflow);
  }

  function navigate(page: PageId) {
    if (page === 'dashboard' || page === 'settings') setActivePage(page);
    else startWorkflow(page);
  }

  function openDocument(document: WritingDocument) {
    setCurrentDocument(document);
    setValues({ voice: voiceSamples });
    setActivePage(document.workflow);
  }

  function updateDocument(changes: Partial<WritingDocument>) {
    setCurrentDocument((current) => current ? { ...current, ...changes } : current);
  }

  async function runWorkflow() {
    if (!anna || !currentDocument) return;
    setGenerating(true);
    setNotification(null);
    try {
      await generateCompletion(anna, currentDocument.workflow, values, (content) => {
        setCurrentDocument((current) => current?.id === currentDocument.id ? { ...current, content } : current);
      });
      setNotification({ message: 'Your writing is ready to edit.', tone: 'success' });
    } catch (error) {
      setNotification({ message: errorMessage(error), tone: 'error' });
    } finally {
      setGenerating(false);
    }
  }

  async function copyDocument() {
    if (!currentDocument?.content) return;
    try {
      await navigator.clipboard.writeText(currentDocument.content);
      setNotification({ message: 'Copied to clipboard.', tone: 'success' });
    } catch {
      setNotification({ message: 'Clipboard access was denied by the browser.', tone: 'error' });
    }
  }

  async function exportCurrentDocument(format: ExportFormat) {
    if (!currentDocument?.content) return;
    try {
      await downloadDocument(currentDocument, format);
      setNotification({ message: `${format.toUpperCase()} file exported.`, tone: 'success' });
    } catch (error) {
      setNotification({ message: `Export failed: ${errorMessage(error)}`, tone: 'error' });
    }
  }

  async function saveVoiceSamples(samples: string): Promise<boolean> {
    if (!anna) return false;
    try {
      await anna.storage.set({ key: VOICE_KEY, value: samples });
      setVoiceSamples(samples);
      setNotification({ message: 'Writing samples saved to Anna storage.', tone: 'success' });
      return true;
    } catch (error) {
      setNotification({ message: `Writing samples could not be saved: ${errorMessage(error)}`, tone: 'error' });
      return false;
    }
  }

  const activeWorkflow = activePage !== 'dashboard' && activePage !== 'settings' ? workflows[activePage] : null;
  const pageTitle = activePage === 'dashboard' ? 'Dashboard' : activeWorkflow?.title ?? 'Settings';

  return (
    <div className="app-shell">
      <Sidebar activePage={activePage} connectionReady={Boolean(anna)} documents={documents} onNavigate={navigate} onOpenDocument={openDocument} />
      <main className="main-panel">
        <header className="topbar">
          <span className="breadcrumb">Workspace <span>/</span> {pageTitle}</span>
          <span className="connection-badge"><span />{anna ? 'ANNA CONNECTED' : 'PREVIEW MODE'}</span>
        </header>
        {activePage === 'dashboard' && <div className="page-content"><Dashboard documents={documents} onCreate={startWorkflow} onOpen={openDocument} /></div>}
        {activePage === 'settings' && <Settings connected={Boolean(anna)} initialSamples={voiceSamples} onSaveSamples={saveVoiceSamples} />}
        {activeWorkflow && currentDocument && (
          <WorkflowStudio
            workflow={activeWorkflow}
            document={currentDocument}
            values={values}
            connected={Boolean(anna)}
            busy={generating}
            saving={saving}
            onValuesChange={(key, value) => setValues((current) => ({ ...current, [key]: value }))}
            onGenerate={() => void runWorkflow()}
            onTitleChange={(title) => updateDocument({ title })}
            onContentChange={(content) => updateDocument({ content })}
            onCopy={() => void copyDocument()}
            onExport={exportCurrentDocument}
          />
        )}
      </main>
      {notification && <Toast message={notification.message} tone={notification.tone} />}
    </div>
  );
}
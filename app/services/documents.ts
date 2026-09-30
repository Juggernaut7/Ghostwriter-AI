import type { AnnaRuntime } from '../platform/anna';
import type { WritingDocument } from '../types/domain';

const DOCUMENTS_KEY = 'ghostwriter-ai:documents:v1';

export async function loadDocuments(anna: AnnaRuntime): Promise<WritingDocument[]> {
  const result = await anna.storage.get({ key: DOCUMENTS_KEY });
  const wrapped = result as { value?: unknown };
  const value = wrapped && typeof wrapped === 'object' && 'value' in wrapped ? wrapped.value : result;
  return Array.isArray(value) ? value as WritingDocument[] : [];
}

export async function saveDocuments(anna: AnnaRuntime, documents: WritingDocument[]): Promise<void> {
  await anna.storage.set({ key: DOCUMENTS_KEY, value: documents });
}
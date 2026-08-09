import { apiRequest } from './client';

export async function processDocumentWithAI(docId) {
  return await apiRequest(`/ai/process/${docId}`, {
    method: 'POST',
    body: JSON.stringify({ document_id: docId }),
  });
}

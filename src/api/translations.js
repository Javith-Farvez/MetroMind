import { apiRequest } from './client';

export async function translateDocument(documentId, targetLanguage) {
  return await apiRequest(`/documents/${documentId}/translate`, {
    method: 'POST',
    body: JSON.stringify({ target_language: targetLanguage }),
  });
}

export async function translateDocumentPage(documentId, pageNumber = 1, targetLanguage = 'Malayalam') {
  return await apiRequest(`/documents/${documentId}/pages/${pageNumber}/translation?target_language=${encodeURIComponent(targetLanguage)}`);
}

export async function fetchDocumentTranslations(documentId) {
  return await apiRequest(`/documents/${documentId}/translations`);
}

// MetroMind AI — Enterprise API Service Client Layer
export * from '../api/client';
export * from '../api/auth';
export * from '../api/documents';
export * from '../api/tasks';
export * from '../api/approvals';
export * from '../api/notifications';
export * from '../api/compliance';
export * from '../api/analytics';
export * from '../api/users';
export * from '../api/departments';
export * from '../api/search';
export * from '../api/ai';

import { fetchDocuments, uploadDocument, ragSearch } from '../api/documents';
import { apiRequest } from '../api/client';

export async function fetchLiveDocuments(department = null) {
  try {
    return await fetchDocuments(department);
  } catch (err) {
    console.warn('Backend API connection fallback:', err);
    return null;
  }
}

export async function ingestLiveDocument(title, category, department, file) {
  try {
    return await uploadDocument(title, category, department, file);
  } catch (err) {
    console.warn('Backend document ingestion fallback:', err);
    return null;
  }
}

export async function queryLiveRAG(query, language = 'English') {
  try {
    return await apiRequest('/assistant/query', {
      method: 'POST',
      body: JSON.stringify({ query, language }),
    });
  } catch (err) {
    try {
      return await ragSearch(query);
    } catch (e) {
      console.warn('Backend RAG search fallback:', e);
      return null;
    }
  }
}

export async function fetchLiveGraphNodes() {
  try {
    return await apiRequest('/graph/nodes');
  } catch (err) {
    console.warn('Backend graph nodes fallback:', err);
    return null;
  }
}

export async function fetchLiveGraphEdges() {
  try {
    return await apiRequest('/graph/edges');
  } catch (err) {
    console.warn('Backend graph edges fallback:', err);
    return null;
  }
}

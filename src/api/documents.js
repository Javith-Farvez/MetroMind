import { apiRequest } from './client';

export async function fetchDocuments(filters = {}) {
  const params = new URLSearchParams();
  if (filters.department && filters.department !== 'All') params.append('department', filters.department);
  if (filters.category && filters.category !== 'All') params.append('category', filters.category);
  if (filters.priority && filters.priority !== 'All') params.append('priority', filters.priority);
  if (filters.status && filters.status !== 'All') params.append('status', filters.status);
  if (filters.language && filters.language !== 'All') params.append('language', filters.language);
  if (filters.search) params.append('search', filters.search);
  if (filters.skip) params.append('skip', filters.skip);
  if (filters.limit) params.append('limit', filters.limit);

  const queryStr = params.toString() ? `?${params.toString()}` : '';
  return await apiRequest(`/documents/${queryStr}`);
}

export async function uploadDocument(title, category, department, file) {
  const formData = new FormData();
  formData.append('title', title);
  formData.append('category', category);
  formData.append('department', department);
  formData.append('file', file);

  return await apiRequest('/documents/upload', {
    method: 'POST',
    body: formData,
  });
}

export async function fetchProcessingStatus(documentId) {
  return await apiRequest(`/documents/${documentId}/processing-status`);
}

export async function fetchDocumentDetails(documentId) {
  return await apiRequest(`/documents/${documentId}`);
}

export async function fetchDocumentPage(documentId, pageNumber = 1) {
  return await apiRequest(`/documents/${documentId}/pages/${pageNumber}`);
}

export async function fetchDocumentAnalysis(documentId, language = 'English') {
  return await apiRequest(`/documents/${documentId}/analysis?language=${encodeURIComponent(language)}`);
}

export async function ragSearch(query, departmentFilter = null) {
  return await apiRequest('/documents/rag-search', {
    method: 'POST',
    body: JSON.stringify({ query, department_filter: departmentFilter }),
  });
}

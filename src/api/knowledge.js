import { apiRequest } from './client';

export async function fetchDocumentGraph(documentId) {
  return await apiRequest(`/knowledge/documents/${documentId}`);
}

export async function fetchEntityKnowledge(entityType, entityId) {
  return await apiRequest(`/knowledge/entity/${entityType}/${entityId}`);
}

export async function exploreKnowledgeGraph(entityType, entityId, depth = 2) {
  return await apiRequest('/knowledge/explore', {
    method: 'POST',
    body: JSON.stringify({ entity_type: entityType, entity_id: entityId, depth }),
  });
}

export async function fetchSimilarDocuments(documentId) {
  return await apiRequest(`/documents/${documentId}/similar`);
}

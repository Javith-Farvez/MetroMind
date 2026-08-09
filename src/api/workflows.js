import { apiRequest } from './client';

export async function fetchWorkflows() {
  return await apiRequest('/workflows');
}

export async function fetchWorkflowRecommendations(documentId) {
  return await apiRequest(`/documents/${documentId}/workflow-recommendations`);
}

export async function acceptRecommendation(recommendationId, assignedUserId = 1, customNotes = '') {
  return await apiRequest(`/workflow-recommendations/${recommendationId}/accept`, {
    method: 'POST',
    body: JSON.stringify({ assigned_user_id: assignedUserId, custom_notes: customNotes }),
  });
}

export async function rejectRecommendation(recommendationId, rejectionReason = '') {
  return await apiRequest(`/workflow-recommendations/${recommendationId}/reject`, {
    method: 'POST',
    body: JSON.stringify({ rejection_reason: rejectionReason }),
  });
}


export async function editRecommendation(recommendationId, updateData) {
  return await apiRequest(`/workflow-recommendations/${recommendationId}`, {
    method: 'PUT',
    body: JSON.stringify(updateData),
  });
}

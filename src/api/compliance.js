import { apiRequest } from './client';

export async function fetchComplianceItems() {
  return await apiRequest('/compliance/');
}

export async function createComplianceItem(item) {
  return await apiRequest('/compliance/', {
    method: 'POST',
    body: JSON.stringify(item),
  });
}

export async function updateComplianceItem(id, updates) {
  return await apiRequest(`/compliance/${id}`, {
    method: 'PUT',
    body: JSON.stringify(updates),
  });
}

export async function uploadComplianceEvidence(id, file, notes = '') {
  const formData = new FormData();
  formData.append('file', file);
  if (notes) formData.append('notes', notes);

  return await apiRequest(`/compliance/${id}/evidence`, {
    method: 'POST',
    body: formData,
  });
}

export async function completeComplianceItem(id) {
  return await apiRequest(`/compliance/${id}/complete`, {
    method: 'POST',
  });
}

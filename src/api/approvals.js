import { apiRequest } from './client';

export async function fetchApprovals() {
  return await apiRequest('/approvals/');
}

export async function createApproval(approvalData) {
  return await apiRequest('/approvals/', {
    method: 'POST',
    body: JSON.stringify(approvalData),
  });
}

export async function updateApproval(approvalId, status, comments) {
  return await apiRequest(`/approvals/${approvalId}`, {
    method: 'PUT',
    body: JSON.stringify({ status, comments }),
  });
}

export async function approveRequest(approvalId, comments = '') {
  return await apiRequest(`/approvals/${approvalId}/approve?comments=${encodeURIComponent(comments)}`, {
    method: 'POST',
  });
}

export async function rejectRequest(approvalId, comments = '') {
  return await apiRequest(`/approvals/${approvalId}/reject?comments=${encodeURIComponent(comments)}`, {
    method: 'POST',
  });
}

export async function returnRequest(approvalId, comments = '') {
  return await apiRequest(`/approvals/${approvalId}/return?comments=${encodeURIComponent(comments)}`, {
    method: 'POST',
  });
}

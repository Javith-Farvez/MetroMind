import { apiRequest } from './client';

export async function fetchDashboardSummary() {
  return await apiRequest('/dashboard/summary');
}

export async function fetchAnalyticsOverview() {
  return await apiRequest('/analytics/overview');
}

export async function fetchDocumentsByDepartment() {
  return await apiRequest('/analytics/documents-by-department');
}

export async function fetchDocumentsByLanguage() {
  return await apiRequest('/analytics/documents-by-language');
}

export async function fetchRiskDistribution() {
  return await apiRequest('/analytics/risk-distribution');
}

export async function fetchDocumentTrend() {
  return await apiRequest('/analytics/document-trend');
}

export async function importPublicKMRLData(sourceUrl, sourceTitle) {
  return await apiRequest('/sources/import-public', {
    method: 'POST',
    body: JSON.stringify({ source_url: sourceUrl, source_title: sourceTitle }),
  });
}


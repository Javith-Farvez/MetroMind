import { apiRequest } from './client';

export async function executeSearch(query, filters = {}, page = 1, pageSize = 20) {
  return await apiRequest('/search/', {
    method: 'POST',
    body: JSON.stringify({ query, filters, page, page_size: pageSize }),
  });
}

export async function fetchSearchHistory() {
  return await apiRequest('/search/history');
}

export async function deleteSearchHistoryItem(historyId) {
  return await apiRequest(`/search/history/${historyId}`, {
    method: 'DELETE',
  });
}

export async function fetchSavedSearches() {
  return await apiRequest('/search/saved');
}

export async function createSavedSearch(name, query, filters = {}) {
  return await apiRequest('/search/saved', {
    method: 'POST',
    body: JSON.stringify({ name, query, filters }),
  });
}

export async function deleteSavedSearchItem(savedId) {
  return await apiRequest(`/search/saved/${savedId}`, {
    method: 'DELETE',
  });
}

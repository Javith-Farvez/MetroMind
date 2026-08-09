import { apiRequest } from './client';

export async function queryAssistant(query, language = 'English', history = []) {
  return await apiRequest('/assistant/query', {
    method: 'POST',
    body: JSON.stringify({ query, language, history }),
  });
}

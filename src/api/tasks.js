import { apiRequest } from './client';

export async function fetchTasks(userId = null) {
  const query = userId ? `?user_id=${userId}` : '';
  return await apiRequest(`/tasks/${query}`);
}

export async function createTask(taskData) {
  return await apiRequest('/tasks/', {
    method: 'POST',
    body: JSON.stringify(taskData),
  });
}

export async function updateTask(taskId, updates) {
  return await apiRequest(`/tasks/${taskId}`, {
    method: 'PUT',
    body: JSON.stringify(updates),
  });
}

export async function assignTask(taskId, assignedToUserId) {
  return await apiRequest(`/tasks/${taskId}/assign?assigned_to_user_id=${assignedToUserId}`, {
    method: 'POST',
  });
}

export async function completeTask(taskId) {
  return await apiRequest(`/tasks/${taskId}/complete`, {
    method: 'POST',
  });
}

export async function reopenTask(taskId) {
  return await apiRequest(`/tasks/${taskId}/reopen`, {
    method: 'POST',
  });
}

export async function addTaskComment(taskId, text) {
  return await apiRequest(`/tasks/${taskId}/comments?text=${encodeURIComponent(text)}`, {
    method: 'POST',
  });
}

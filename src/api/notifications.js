import { apiRequest } from './client';

export async function fetchNotifications(userId = 1) {
  return await apiRequest(`/notifications/?user_id=${userId}`);
}

export async function markNotificationRead(id) {
  return await apiRequest(`/notifications/${id}/read`, {
    method: 'PUT',
  });
}

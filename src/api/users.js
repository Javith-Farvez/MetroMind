import { apiRequest } from './client';

export async function fetchUsers() {
  return await apiRequest('/users/');
}

export async function fetchUserById(id) {
  return await apiRequest(`/users/${id}`);
}

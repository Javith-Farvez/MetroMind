import { apiRequest } from './client';

export async function loginUser(email, password) {
  const res = await apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  if (res.access_token) {
    localStorage.setItem('metroflow_token', res.access_token);
    localStorage.setItem('metroflow_user', JSON.stringify(res));
  }
  return res;
}

export async function registerUser(userData) {
  return await apiRequest('/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  });
}

export function logoutUser() {
  localStorage.removeItem('metroflow_token');
  localStorage.removeItem('metroflow_user');
}

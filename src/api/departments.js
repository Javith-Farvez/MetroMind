import { apiRequest } from './client';

export async function fetchDepartments() {
  return await apiRequest('/departments/');
}

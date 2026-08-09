import { apiRequest } from './client';

export async function processMeetingMinutes(title, minutesText, departmentId = 1) {
  return await apiRequest('/meetings/process', {
    method: 'POST',
    body: JSON.stringify({ title, minutes_text: minutesText, department_id: departmentId }),
  });
}

export async function fetchMeetingDetails(meetingId) {
  return await apiRequest(`/meetings/${meetingId}`);
}

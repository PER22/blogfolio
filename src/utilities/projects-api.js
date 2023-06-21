import sendRequest from "./send-request";

const BASE_URL = '/api/projects';

export async function createProject(projectData) {
  return sendRequest(BASE_URL, 'POST', projectData);
}

export async function getProjectById(projectId) {
  return sendRequest(`${BASE_URL}/${projectId}`);
}

export async function updateProject(projectId, projectData) {
  return sendRequest(`${BASE_URL}/${projectId}`, 'PUT', projectData);
}

export async function deleteProject(projectId) {
  return sendRequest(`${BASE_URL}/${projectId}`, 'DELETE');
}

export async function getUserProjects() {
  return sendRequest(BASE_URL);
}

export async function starProject(projectId) {
  return sendRequest(`${BASE_URL}/${projectId}/star`, "POST");
}

export async function unstarProject(projectId) {
  return sendRequest(`${BASE_URL}/${projectId}/star`, "DELETE");
}

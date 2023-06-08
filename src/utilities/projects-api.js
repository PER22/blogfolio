import sendRequest from "./send-request";

const BASE_URL = '/api/projects';

export async function createProject(projectData) {
  return sendRequest(BASE_URL, 'POST', projectData);
}

export async function getProjectById(projectId) {
  return sendRequest(`${BASE_URL}/${projectId}`);
}

export async function getUserProjects() {
  return sendRequest(BASE_URL); 
}

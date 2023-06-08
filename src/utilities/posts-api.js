import sendRequest from "./send-request";

const BASE_URL = '/api/blog';

export async function createPost(postData) {
  return sendRequest(BASE_URL, 'POST', postData);
}

export async function getPostById(postId) {
  return sendRequest(`${BASE_URL}/${postId}`);
}

export async function getUserPosts() {
  return sendRequest(BASE_URL); 
}

export async function updatePost(postId, postData) {
  return sendRequest(`${BASE_URL}/${postId}`, 'PUT', postData);
}

export async function deletePost(postId) {
  return sendRequest(`${BASE_URL}/${postId}`, 'DELETE');
}

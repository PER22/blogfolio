import sendRequest from "./send-request";
const BASE_URL = '/api/profile';

export async function getProfileRequest(){
    return sendRequest(`${BASE_URL}`) 
}

export async function updateProfileRequest(profileData) {
    return sendRequest(BASE_URL, 'PUT', profileData);
  }
  
  export async function deleteProfileRequest() {
    return sendRequest(BASE_URL, 'DELETE');
  }
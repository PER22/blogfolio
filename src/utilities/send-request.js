import { getToken } from "./users-service";
export default async function sendRequest(url, method = 'GET', payload=null){
    const options = { method };
    if(payload){
        options.headers = {'Content-Type': 'application/json'};
        options.body = JSON.stringify(payload);
        console.log(options.body);
    }
    const token = getToken();
    if(token){
        options.headers = options.headers || {}
        options.headers.Authorization = `Bearer ${token}`;
    }
    console.log("URL:", url);
    const res = await fetch(url, options);
    if (res.ok){
        return res.json();
    }else{
        throw new Error('Bad Request')
    }
}
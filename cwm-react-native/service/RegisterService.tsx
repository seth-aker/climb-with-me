//TODO: create a type user info for better ts compilation 
import axios, { AxiosRequestConfig } from "axios";

const baseUrl = "http://localhost:8080/api"

export async function registerUser(token: string, user: {}, ) {
    const response = await fetch('http://localhost:8080/register', {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            
        },
        body: JSON.stringify({
            user
        }),
    }).then((resp) => resp.json());

    return response.body;
};

export async function getUserProfile(token: string, userId: string) {
    const config: AxiosRequestConfig = {
        baseURL: baseUrl,
        headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    }; 
    const response = await axios.get(`/profile/${userId}`, config)
    if(response.status === 200) {
        return response.data
    }
}
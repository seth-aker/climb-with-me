import axios, { AxiosRequestConfig } from "axios";

const baseUrl = "http://localhost:8080/api"

export function getUserProfile(token: string | undefined, userId: string) {
    
    const config: AxiosRequestConfig = {
        baseURL: baseUrl,
        headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    }; 
    return axios.get(`/profile/${userId}`, config)   
}
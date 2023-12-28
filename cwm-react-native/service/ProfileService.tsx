import axios, { AxiosRequestConfig } from "axios";
import { CWMUser } from "../assets/types/profileData";

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

export function updateUserProfile(token: string | undefined, userId: string, userProfile: CWMUser) {
    const config: AxiosRequestConfig = {
        baseURL: baseUrl,
        headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
        }  
    }
    return axios.post(`/profile/${userId}`, userProfile, config)
}
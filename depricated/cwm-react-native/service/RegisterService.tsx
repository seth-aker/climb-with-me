import axios, { AxiosRequestConfig } from "axios";
import { User } from "react-native-auth0";
const baseUrl = "http://10.0.2.2:8080/api/register"

export function registerNewUser(token: string | undefined, newUser: User ) {
    const config : AxiosRequestConfig = {
        baseURL: baseUrl,
        headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    }; 
    return axios.post("/new_user", newUser, config)
}
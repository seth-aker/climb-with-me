import axios, { AxiosResponse } from "axios"
import Config from "app/config"
import { IUserStoreSnapshotOut } from "app/models/UserStore"

const api = axios.create({
  // http://localhost:3000/api/v1
  baseURL: Config.API_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
})

export const postUser = async (user: IUserStoreSnapshotOut, token: string) => {
  try {
    const response: AxiosResponse<IUserStoreSnapshotOut> = await api.post("/users", user, {
      headers: { Authorization: `Bearer ${token}` },
    })
    if (response.status !== 204 && response.status !== 200) {
      throw Error("Error status: " + response.status + ": " + response.statusText)
    }
    return response.data
  } catch (error) {
    console.log(error)
    return undefined
  }
}
export const getUser = async (
  userId: string,
  token: string,
): Promise<IUserStoreSnapshotOut | undefined> => {
  try {
    const response: AxiosResponse<IUserStoreSnapshotOut> = await api.get(`/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    if (response.status !== 200) {
      throw Error("Error status: " + response.status + ": " + response.statusText)
    }
    return response.data
  } catch (error) {
    console.log(error)
    return undefined
  }
}

import { AxiosResponse } from "axios"
import api from "../api"
import { IChatSnapshotOut } from "app/models/Chat"

export const getUserChats: (token: string) => Promise<AxiosResponse<IChatSnapshotOut[]>> = async (
  token: string,
) => {
  return await api.get("/chats", { headers: { Authorization: `Bearer ${token}` } })
}

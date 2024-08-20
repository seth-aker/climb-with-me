import { IFriendRequestSnapshotOut } from "app/models/FriendRequest"
import api from "../api"
import { AxiosResponse } from "axios"

export const getFriendsList = async (token: string) => {
  return await api.get("/friends", { headers: { Authorization: `Bearer ${token}` } })
}
export const getFriendRequests = async (token: string) => {
  const result: AxiosResponse<{ friendRequests: IFriendRequestSnapshotOut[] }> = await api.get(
    "/friends/requests",
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  )
  return result
}
export const createFriendRequest = async (
  friendRequest: IFriendRequestSnapshotOut,
  token: string,
) => {
  return await api.post("/friends/requests", friendRequest, {
    headers: { Authorization: `Bearer ${token}` },
  })
}
export const respondToFriendRequest = async (requestId: string, accept: boolean, token: string) => {
  return await api.patch(`/friends/requests/${requestId}?accepted=${accept}`, undefined, {
    headers: { Authorization: `Bearer ${token}` },
  })
}

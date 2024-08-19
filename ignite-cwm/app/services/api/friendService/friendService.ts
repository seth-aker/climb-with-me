import api from "../api"

export const getFriendsList = async (token: string) => {
  return await api.get("/friends", { headers: { Authorization: `Bearer ${token}` } })
}

export const createFriendRequest

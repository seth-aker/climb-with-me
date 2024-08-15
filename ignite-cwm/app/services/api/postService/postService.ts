import { PostSnapshotOut } from "app/models/Post"
import api from "../api"

export const getRecentPosts = async (token: string) => {
  return await api.get(`/posts/feed`, { headers: { Authorization: `Bearer ${token}` } })
}

export const createPost = async (data: PostSnapshotOut, token: string) => {
  return await api.post("/posts/create", data, { headers: { Authorization: `Bearer ${token}` } })
}

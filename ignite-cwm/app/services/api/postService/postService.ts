import { PostSnapshotOut } from "app/models/Post"
import api from "../api"
import { ICommentSnapshotOut } from "app/models/CommentModel"

export const getRecentPosts = async (token: string) => {
  return await api.get(`/posts/feed`, { headers: { Authorization: `Bearer ${token}` } })
}

export const createPost = async (data: PostSnapshotOut, token: string) => {
  const result = await api.post("/posts", data, { headers: { Authorization: `Bearer ${token}` } })
  return result
}

export const addLike = async (postId: string, token: string) => {
  return await api.patch(`/posts/${postId}/like`, undefined, {
    headers: { Authorization: `Bearer ${token}` },
  })
}
export const removeLike = async (postId: string, token: string) => {
  return await api.patch(`/posts/${postId}/unlike`, undefined, {
    headers: { Authorization: `Bearer ${token}` },
  })
}
export const addComment = async (postId: string, comment: ICommentSnapshotOut, token: string) => {
  return await api.patch(`/posts/${postId}`, comment, {
    headers: { Authorization: `Bearer ${token}` },
  })
}
export const updateComment = async (
  postId: string,
  comment: ICommentSnapshotOut,
  token: string,
) => {
  return await api.patch(`/post/${postId}/comment-${comment._id}`, comment, {
    headers: { Authorization: `Bearer ${token}` },
  })
}
export const deletePost = async (postId: string, token: string) => {
  return await api.delete(`/posts/${postId}`, { headers: { Authorization: `Bearer ${token}` } })
}

const postService = { getRecentPosts, createPost, addLike, removeLike, addComment, deletePost }

export default postService

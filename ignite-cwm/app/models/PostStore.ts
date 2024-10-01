import { cast, flow, getSnapshot, Instance, SnapshotOut, types } from "mobx-state-tree"
import { Post, PostModel } from "./Post"
import postService from "app/services/api/postService/postService"
import { AxiosResponse } from "axios"

export const PostStoreModel = types
  .model("PostStore", {
    posts: types.array(PostModel),
    selectedPostId: types.maybeNull(types.string),
  })
  .views((store) => ({
    getPostById(guid: string) {
      return store.posts.find((post) => post._id === guid)
    },
    get totalLikes() {
      let totalLikes = 0
      store.posts.forEach((post) => {
        totalLikes += post.likes.length
      })
      return totalLikes
    },
    postMarkers() {
      return store.posts.map((post) => {
        return {
          lat: post.tripLocation.latitude,
          lng: post.tripLocation.longitude,
          title: post.title,
          description: post.body,
        }
      })
    },
  }))
  .actions((store) => ({
    addPost(post: Post) {
      store.posts.push(post)
    },
    removePost(post: Post) {
      return store.posts.remove(post)
    },
    setSelectedPostId(postId: string | null) {
      store.selectedPostId = postId
    },
    setPosts(posts: Post[]) {
      store.posts = cast(posts)
    },
  }))
  .actions((store) => {
    const createPost = flow(function* (post: Post, token: string) {
      // optimistic update to the ui
      store.addPost(post)
      try {
        console.log("Sending post")
        yield postService.createPost(getSnapshot(post), token)
        return true
      } catch (e) {
        store.removePost(post)
        alert("An error occurred adding this post. Please try again")
        console.log(e)
        return false
      }
    })
    const fetchPosts = flow(function* (token: string) {
      try {
        const results: AxiosResponse<Post[]> = yield postService.getRecentPosts(token)
        store.setPosts(results.data)
        return true
      } catch (e) {
        alert("An error occurred fetching posts, please try again.")
        return false
      }
    })
    const deletePost = flow(function* (postId: string, token: string) {
      try {
        yield postService.deletePost(postId, token)
        return true
      } catch (e) {
        alert("An error occurred deleting the post. Please try again.")
        return false
      }
    })
    return { createPost, fetchPosts, deletePost }
  })

export interface IPostStore extends Instance<typeof PostStoreModel> {}
export interface IPostStoreSnapshot extends SnapshotOut<typeof PostStoreModel> {}

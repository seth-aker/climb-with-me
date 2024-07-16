import { Instance, SnapshotOut, types } from "mobx-state-tree";
import { Post, PostModel } from "./Post";



export const PostStoreModel = types
.model("PostStore", {
    posts: types.array(PostModel),
})
.actions(( store ) => ({
    async fetchPosts() {
      // implement api call here 
      return true 
    },
    async createPost(post: Post) {
        // implement api call here
        // store.posts = response.data or something
        // for now:
        store.posts.push(post)
        return true
    },
    async deletePost(postGuid: string) {
        // implement api call here
        store.posts.filter(posts => {
            return posts.guid !== postGuid;
        })
        return true
    }
}))

export interface IPostStore extends Instance<typeof PostStoreModel>{}
export interface IPostStoreSnapshot extends SnapshotOut<typeof PostStoreModel> {}

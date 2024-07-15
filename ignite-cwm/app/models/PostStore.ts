import { Instance, SnapshotOut, types } from "mobx-state-tree";
import { PostModel } from "./Post";


export const PostStoreModel = types
.model("PostStore", {
    posts: types.array(PostModel),
})
.actions((/* store */) => ({
    async fetchPosts() {
      // implement api call here  
    },
}))

export interface IPostStore extends Instance<typeof PostStoreModel>{}
export interface IPostStoreSnapshot extends SnapshotOut<typeof PostStoreModel> {}

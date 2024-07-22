import { Instance, SnapshotOut, types } from "mobx-state-tree";
import { Post, PostModel } from "./Post";



export const PostStoreModel = types
.model("PostStore", {
    posts: types.array(PostModel),
    selectedPostId: types.maybeNull(types.string)
}).views((store) => ({
     getPostById(guid: string) {
        return store.posts.find(post => post.guid === guid)
    }
})).actions(( store ) => ({
    addPost(post: Post) {
        store.posts.push(post);
    },
    deletePost(post: Post) {
        return store.posts.remove(post);
    },
    setSelectedPostId(postId: string | null) {
        store.selectedPostId = postId;
    }
}))
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
    async deletePostAsync(post: Post) {
        // implement api call here
        store.deletePost(post); 
    }
}))


export interface IPostStore extends Instance<typeof PostStoreModel>{}
export interface IPostStoreSnapshot extends SnapshotOut<typeof PostStoreModel> {}

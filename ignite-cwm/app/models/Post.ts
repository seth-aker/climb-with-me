import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree";
import { CommentModel, IComment } from "./CommentModel";


export const PostModel = types
.model("Post", {
    guid: types.identifier,
    title: "",
    body: "",
    tripDate: types.Date,
    createdAt: types.Date,
    postUser: "",
    postUserId: "",
    postUserImg: "",
    comments: types.array(CommentModel),
    likes: types.array(types.string) // Array of GUIDs of the other users who have liked the post
    // tripLocation: "",
})
.actions((post) => ({
    addLiked(guid: string) {
        post.likes.push(guid);
    },
    removedLiked(guid: string) {
        post.likes.remove(guid);
    },
    addComment(comment: IComment) {
        post.comments.push(comment)
    }
}))
.views((post) => ({
    isLikedByUser(guid: string) {
        if(guid === "") { // this should probably throw an error in the future 
            return false
        }
        return post.likes.includes(guid);
    },
    timeSincePost() {
        return Date.now() - post.createdAt.getTime()
    }
}) )
.actions((post) => ({
    toggleLiked(guid: string) {
        if(post.isLikedByUser(guid)) {
            post.removedLiked(guid)
        } else {
            post.addLiked(guid)
        }
    },
}))

export interface Post extends Instance<typeof PostModel> {}
export interface PostSnapshotIn extends SnapshotIn<typeof PostModel>{}
export interface PostSnapshotOut extends SnapshotOut<typeof PostModel>{}

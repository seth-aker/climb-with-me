import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { CommentModel, IComment } from "./CommentModel"
import { LocationModel } from "./Location"

export const PostModel = types
  .model("Post", {
    _id: types.identifier,
    /**
     * Header title for the post
     */
    title: "",
    /**
     * Body of the post
     */
    body: "",
    /**
     * When the poster plans to go climbing
     */
    tripDate: types.Date,
    /**
     * Lat and long coordinates of the climbing area
     */
    coordinates: LocationModel,
    climbingType: types.enumeration(["Sport", "Trad", "Bouldering", "Top Rope"]),
    createdAt: types.Date,
    /**
     * Name of the user who posted the message
     */
    authorName: "",
    /**
     * Guid of the user who posted the message
     */
    authorId: "",
    /**
     * Profile img uri of the user who posted the message
     */
    authorProfImg: "",
    /**
     * List of comments related to the post.
     */
    comments: types.array(CommentModel),
    /**
     * Array of GUIDs of the other users who have liked the post
     */
    likes: types.array(types.string),
  })
  .actions((post) => ({
    addLiked(guid: string) {
      post.likes.push(guid)
    },
    removedLiked(guid: string) {
      post.likes.remove(guid)
    },
    addComment(comment: IComment) {
      post.comments.push(comment)
    },
    deleteComment(comment: IComment) {
      post.comments.remove(comment)
    },
  }))
  .views((post) => ({
    isLikedByUser(guid: string) {
      return post.likes.includes(guid)
    },
    timeSincePost() {
      return Date.now() - post.createdAt.getTime()
    },
  }))
  .actions((post) => ({
    toggleLiked(guid: string) {
      if (post.isLikedByUser(guid)) {
        post.removedLiked(guid)
      } else {
        post.addLiked(guid)
      }
    },
  }))

export interface Post extends Instance<typeof PostModel> {}
export interface PostSnapshotIn extends SnapshotIn<typeof PostModel> {}
export interface PostSnapshotOut extends SnapshotOut<typeof PostModel> {}

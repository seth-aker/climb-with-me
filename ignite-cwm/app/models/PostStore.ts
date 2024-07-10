import { types } from "mobx-state-tree";
import { PostModel } from "./Post";

export const PostStoreModel = types
.model("PostStore", {
    posts: types.array(PostModel),

})

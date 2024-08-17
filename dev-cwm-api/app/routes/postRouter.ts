import { json, Response, Request, Router } from "express";
import jwtCheck from "../auth/jwtCheck";
import { IPost } from "../database/documentTypes/post.type";
import {
  addComment,
  addLike,
  createPost,
  deletePost,
  getPosts,
  removeLike,
} from "../handlers/postHandler";
import { IComment } from "../database/documentTypes/comment.type";
const router = Router();
// /api/v1/posts

// getFeed
// /api/v1/posts/feed
router.get("/feed", jwtCheck, async (request: Request, response: Response) => {
  getPosts(request, response);
});

// createPost
// /api/v1/posts
router.post(
  "",
  jwtCheck,
  json(),
  async (request: Request<{}, {}, IPost>, response: Response) => {
    createPost(request, response);
  }
);

// addComment
// /api/v1/posts/:id
router.patch(
  "/:id",
  jwtCheck,
  json(),
  async (
    request: Request<{ id: string }, {}, IComment>,
    response: Response
  ) => {
    addComment(request, response);
  }
);

// addLike
// /api/v1/posts/:id/like
router.patch(
  "/:id/like",
  jwtCheck,
  async (request: Request<{ id: string }>, response: Response) => {
    addLike(request, response);
  }
);
// removeLike
// /api/v1/posts/:id/unlike
router.patch(
  "/:id/unlike",
  jwtCheck,
  async (request: Request<{ id: string }>, response: Response) => {
    removeLike(request, response);
  }
);

// deletePost
// /api/v1/posts/:id
router.delete(
  "/:id",
  jwtCheck,
  async (request: Request<{ id: string }>, response: Response) => {
    deletePost(request, response);
  }
);

export default router;

import { Request, Response } from "express";
import { useDatabase } from "../database/connection";
import { IComment } from "../database/documentTypes/comment.type";
import { IPost } from "../database/documentTypes/post.type";
import { Document, MongoError, MongoServerError } from "mongodb";
import { jwtDecode } from "jwt-decode";
import { parseUserId } from "../util/parseUserId";
import { auth } from "express-oauth2-jwt-bearer";

export const createPost = async (
  request: Request<{}, {}, IPost>,
  response: Response
) => {
  const db = await useDatabase();
  const collection = db.collection<IPost>("posts");
  const newPost = request.body;
  const result = await collection.insertOne(newPost);
  response.send(result).status(204);
};

export const getPosts = async (request: Request, response: Response) => {
  const db = await useDatabase();
  const collection = db.collection<IPost>("posts");
  const result = await collection.find({}).limit(50).toArray();
  response.send(result).status(200);
};

export const addLike = async (
  request: Request<{ id: string }>,
  response: Response
) => {
  const authHeader = request.header("authorization");
  const userId = parseUserId(authHeader);

  const db = await useDatabase();
  const collection = db.collection<IPost>("posts");
  // Don't worry about about permissions here, it is checked in the router module
  const query: Document = { _id: request.params.id };
  const updates = {
    $push: { likes: userId },
  };
  const result = await collection.updateOne(query, updates);
  response.send(result).status(200);
};

export const removeLike = async (
  request: Request<{ id: string }>,
  response: Response
) => {
  const authHeader = request.header("authorization");
  const userId = parseUserId(authHeader);

  const db = await useDatabase();
  const collection = db.collection<IPost>("posts");
  // Don't worry about about permissions here, it is checked in the router module
  const query: Document = { _id: request.params.id };
  const updates = {
    $pull: { likes: userId },
  };
  const result = await collection.updateOne(query, updates);
  response.send(result).status(200);
};

export const addComment = async (
  request: Request<{ id: string }, {}, IComment>,
  response: Response
) => {
  const db = await useDatabase();
  const collection = db.collection<IPost>("posts");
  // Don't worry about about permissions here, it is checked in the router module
  const query: Document = { _id: request.params.id };
  const updates = {
    $push: { comments: request.body },
  };
  const result = collection.updateOne(query, updates);
  response.send(result).status(200);
};

export const addCommentLike = async (
  request: Request<{ postId: string; commentId: string }>,
  response: Response
) => {
  const db = await useDatabase();
  const collection = db.collection<IPost>("posts");
  const authHeader = request.header("authorization");
  const userId = parseUserId(authHeader);
  const query: Document = {
    _id: request.params.postId,
  };
  const updates = {
    $addToSet: { "comments.$[comment].likes": userId },
  };
  const arrayFilters = {
    arrayFilters: [{ "comment._id": request.params.commentId }],
  };
  try {
    const result = await collection.updateOne(query, updates, arrayFilters);
    response.send(result);
  } catch (e) {
    console.log(e);
  }
};

export const removeCommentLike = async (
  request: Request<{ postId: string; commentId: string }>,
  response: Response
) => {
  const db = await useDatabase();
  const collection = db.collection<IPost>("posts");
  const authHeader = request.header("authorization");
  const userId = parseUserId(authHeader);
  const query: Document = {
    _id: request.params.postId,
  };
  const updates = {
    $pull: { "comments.$[comment].likes": userId },
  };
  const arrayFilters = {
    arrayFilters: [{ "comment._id": request.params.commentId }],
  };
  const result = collection.updateOne(query, updates, arrayFilters);
  response.send(result);
};

export const deletePost = async (
  request: Request<{ id: string }>,
  response: Response
) => {
  const db = await useDatabase();
  const collection = db.collection<IPost>("posts");
  const query: Document = { _id: request.params.id };
  const postToDelete = await collection.findOne(query);
  const authHeader = request.header("authorization");
  const authorId = parseUserId(authHeader);
  if (postToDelete?.authorId !== authorId) {
    response.sendStatus(401);
  }
  const result = await collection.findOneAndDelete(query);
  response.status(200).send(result);
};

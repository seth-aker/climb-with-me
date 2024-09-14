import e, { Request, Response } from "express";
import { useDatabase } from "../database/connection";
import { parseUserId } from "../util/parseUserId";
import { IFriendRequest } from "../database/documentTypes/friendRequests.type";
import { IUser } from "../database/documentTypes/user.type";
import { Document, ObjectId } from "mongodb";

export const createFriendRequest = async (
  request: Request<{}, {}, IFriendRequest>,
  response: Response
) => {
  const db = await useDatabase();
  const collection = db.collection<IUser>("users");
  const authHeader = request.header("authorization");
  const userId = parseUserId(authHeader);

  const filter: Document = { _id: userId };
  const update = { $push: { friendRequests: request.body } };
  const result = await collection.updateOne(filter, update);
  response.send(result);
};

export const respondToFriendRequest = async (
  request: Request<{ requestId: string }, {}, {}, { accepted: string }>,
  response: Response
) => {
  const db = await useDatabase();
  const collection = db.collection<IUser>("users");
  const authHeader = request.header("authorization");
  const userId = parseUserId(authHeader);

  const filter: Document = { _id: userId };
  if (request.query.accepted === undefined) {
    response.sendStatus(400);
  }
  console.log(request.query.accepted);
  const accepted = Boolean(request.query.accepted);
  const update: Document = accepted
    ? { $set: { "friendRequests.$[request].accepted": accepted } }
    : { $pull: { friendRequests: "friendRequests.$[request]" } };
  const arrayFilters = {
    arrayFilters: [{ "request._id": new ObjectId(request.params.requestId) }],
  };
  if (accepted) {
    // create new friend
    const reqResponse = await collection
      .find<{ friendRequests: IFriendRequest[] }>(filter, {
        projection: { friendRequests: 1, _id: 0 },
      })
      .next();
    const friendRequests = reqResponse?.friendRequests;
    if (!friendRequests) {
      throw new Error(
        "error in Friend handler: could not find friend requests on user: " +
          userId
      );
    }
    const friendRequest = friendRequests.filter(
      (friendRequest) =>
        friendRequest._id.toString() === request.params.requestId
    );
    const newFriendUpdate = {
      $push: {
        friends: {
          _id: friendRequest[0].friendId,
          name: friendRequest[0].friendName,
          profileImg: friendRequest[0].friendProfImg,
          friendSince: Date.now(),
        },
      },
    };
    await collection.updateOne(filter, newFriendUpdate);
  }
  const result = await collection.updateOne(filter, update, arrayFilters);
  response.send(result);
};

export const getFriendRequests = async (
  request: Request,
  response: Response
) => {
  const db = await useDatabase();
  const collection = db.collection("users");
  const authHeader = request.header("authorization");
  const userId = parseUserId(authHeader);
  const filter: Document = { _id: userId };
  const result = await collection
    .aggregate([
      { $match: { _id: userId } },
      { $project: { friendRequests: 1, _id: 0 } },
      { $match: { "friendRequests.accepted": false } },
    ])
    .toArray();

  response.send(...result);
};

export const getFriendsList = async (request: Request, response: Response) => {
  const db = await useDatabase();
  const collection = db.collection("users");
  const authHeader = request.header("authorization");
  const userId = parseUserId(authHeader);
  const filter: Document = { _id: userId };
  const result = await collection.findOne(filter, {
    projection: { friends: true, _id: false },
  });
  response.send(result);
};

export const unFriendUser = async (
  req: Request<{ friendId: string }>,
  res: Response
) => {
  const db = await useDatabase();
  const users = db.collection("users");
  const authHeader = req.header("authorization");
  const userId = parseUserId(authHeader);
  const filter: Document = { _id: userId };
  const update: Document = { $pull: { friends: "friends.$[friend]" } };
  const arrayFilters: Document = {
    arrayFilters: { "friend._id": req.params.friendId },
  };
  const result = await users.findOneAndUpdate(filter, update, arrayFilters);
  res.send(result);
};

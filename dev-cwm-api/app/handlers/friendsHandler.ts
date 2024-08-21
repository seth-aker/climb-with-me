import { Request, Response } from "express";
import { useDatabase } from "../database/connection";
import { parseUserId } from "../util/parseUserId";
import { IFriendRequest } from "../database/documentTypes/friendRequests.type";
import { IUser } from "../database/documentTypes/user.type";
import { Document } from "mongodb";

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

  const update: Document = request.query.accepted
    ? {
        $set: { "friendRequests.$[request].accepted": request.query.accepted },
        $push: {
          friends: {
            _id: "friendRequests.$[request].friendId",
            name: "friendRequests.$[request].friendName",
            profileImg: "friendRequests.$[request].friendProfImg",
            friendSince: Date.now(),
          },
        },
      }
    : { $pull: { friendRequests: "friendRequests.$[request]" } };
  const arrayFilters = {
    arrayFilters: [{ "request._id": request.params.requestId }],
  };
  const result = collection.updateOne(filter, update, arrayFilters);
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
  const result = await collection.findOne(filter, {
    projection: { friendRequests: true, _id: false },
  });
  response.send(result);
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

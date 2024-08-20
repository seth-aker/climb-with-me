import { Request, Response } from "express";
import { useDatabase } from "../database/connection";
import { Document, ObjectId } from "mongodb";
import { IUser } from "../database/documentTypes/user.type";

export const getUserPrivate = async (
  request: Request<{ id: string }>,
  response: Response
) => {
  const db = await useDatabase();
  const collection = db.collection<IUser>("users");
  const query: Document = { _id: request.params.id };
  const result = await collection.findOne(query, {
    projection: { friends: false, friendRequests: false },
  });

  if (result === null) {
    console.log("sending 404");
    response.status(404).send("Not found");
  } else {
    response.status(200).send(result);
  }
};

export const getUserPublic = async (
  request: Request<{ id: string }>,
  response: Response
) => {
  const db = await useDatabase();
  const collection = db.collection("users");
  const query: Document = { _id: request.params.id };
  const result = await collection.findOne(query, {
    projection: { _id: true, name: true, profImg: true, backgroundImg: true },
  });
  if (!result) response.send("Not found").status(404);
  else response.send(result).status(200);
};

export const createUser = async (
  request: Request<{}, {}, IUser>,
  response: Response
) => {
  const db = await useDatabase();
  const collection = db.collection<IUser>("users");
  const newUserDocument = request.body;
  const result = await collection.insertOne(newUserDocument);
  response.send(result).status(204);
};

export const updateUser = async (
  request: Request<{ id: string }, {}, IUser>,
  response: Response
) => {
  const db = await useDatabase();
  const collection = db.collection<IUser>("users");
  const query: Document = { _id: request.params.id };
  const updates = {
    $set: request.body,
  };

  const result = await collection.updateOne(query, updates);
  response.send(result).status(200);
};

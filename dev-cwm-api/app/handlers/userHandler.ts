import { Request, Response } from "express";
import { useDatabase } from "../database/connection";
import { ObjectId } from "mongodb";
import { IUser } from "../database/documentTypes/user.type";

export const getUserPrivate = async (
  request: Request<{ id: string }>,
  response: Response
) => {
  const db = await useDatabase();
  const collection = db.collection("users");
  const query = { _id: new ObjectId(request.params.id) };
  const result = await collection.findOne(query);
  if (!result) response.send("Not found").status(404);
  else response.send(result).status(200);
};

export const getUserPublic = async (
  request: Request<{ id: string }>,
  response: Response
) => {
  const db = await useDatabase();
  const collection = db.collection("users");
  const query = { _id: new ObjectId(request.params.id) };
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

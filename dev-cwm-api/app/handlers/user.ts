import { Request, Response } from "express";
import { useDatabase } from "../database/connection";
import { ObjectId } from "mongodb";


export  const getUserPrivate = async (request: Request<{id: string}>, response: Response) => {
  const db = await useDatabase();
  const collection = db.collection("users")
  const query = {_id: new ObjectId(request.params.id)}
  const result = await collection.findOne(query)
  if (!result) response.send("Not found").status(404);
  else response.send(result).status(200);
}

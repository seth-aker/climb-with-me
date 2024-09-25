import { Server, Socket } from "socket.io";
import { IMessage } from "../database/documentTypes/message.type";
import { useDatabase } from "../database/connection";
import { Document } from "mongodb";
import { IChat } from "../database/documentTypes/chat.type";
import { Request, Response } from "express";
import { parseUserId } from "../util/parseUserId";

export const registerMessageHandler = async (io: Server, socket: Socket) => {
  const db = await useDatabase();
  const chats = db.collection("chats");

  const sendMessage = async (_chat: IChat, message: IMessage) => {
    const filter: Document = { _id: _chat._id };
    const chat = await chats.findOne<IChat>(filter);
    if (!chat) {
      _chat.messages.push(message);
      chats.insertOne(_chat);
    } else {
      chat.messages.push(message);
      await chats.findOneAndReplace(filter, chat);
    }
    console.log(`${message.ownerId} sent this message: ${message.body}`);
    socket.to(_chat._id.toString()).emit("message", message);
  };
  const joinRoom = (roomId: string) => {
    socket.join(roomId);
    console.log(`A user joined room: ${roomId}`);
  };

  socket.on("join", joinRoom);
  socket.on("message", sendMessage);
};

export const getUserChats = async (req: Request, res: Response) => {
  const db = await useDatabase();
  const chats = db.collection("chats");
  const authHeader = req.header("authorization");
  const userId = parseUserId(authHeader);
  const filter: Document = { "users._id": { $in: [userId] } };
  const result = await chats.find(filter).toArray();
  res.send(result);
};

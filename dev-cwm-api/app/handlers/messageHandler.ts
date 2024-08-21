import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

export const registerMessageHandler = (io: Server, socket: Socket) => {
  const sendMessage = (message: string) => {
    console.log(message);
    socket.broadcast.emit(message);
  };
  socket.on("message", sendMessage);
};

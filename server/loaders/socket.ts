import { Server } from "socket.io";
import { Server as HttpServer } from "http";
import Logger from "./logger";

export default (server: HttpServer): Server => {
  const io = new Server(server);

  io.on("connection", (socket) => {
    Logger.info(`Connection count: ${io.engine.clientsCount}`);
  });

  return io;
};

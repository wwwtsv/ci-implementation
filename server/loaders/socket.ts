import { Server } from "socket.io";
import { Server as HttpServer } from "http";
import Logger from "./logger";

export default (server: HttpServer): Server => {
  const IoServer = new Server(server);

  IoServer.on("connection", () => {
    const connectionsCount = IoServer.engine.clientsCount;
    Logger.info(`Connection count: ${connectionsCount}`);
    IoServer.emit("connections", connectionsCount);
  });

  return IoServer;
};

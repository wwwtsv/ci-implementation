import { Server } from "socket.io";
import { Server as HttpServer } from "http";
import Logger from "./logger";

const IoServer = (server: HttpServer): Server => {
  const IoServer = new Server(server);

  IoServer.on("connection", (socket) => {
    const connectionsCount = IoServer.engine.clientsCount;
    Logger.silly(`Connection count: ${connectionsCount}`);

    IoServer.emit("client:connect", connectionsCount);

    socket.join("agents:active");

    socket.on("disconnect", (reason) => {
      IoServer.emit("client:disconnect");
      Logger.silly(`Client disconnected reason: ${reason}`);
    });
  });

  return IoServer;
};

export default IoServer;

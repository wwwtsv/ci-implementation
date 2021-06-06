import { Server, Socket } from "socket.io";
import Logger from "../loaders/logger";

const emitActiveAgentsToView = (io: Server): void => {
  io.in("agents:active")
    .fetchSockets()
    .then((sockets) => {
      io.emit("views:connections", sockets.length);
    });
};

const connections = (io: Server, socket: Socket): void => {
  socket.on("agents:active", () => {
    socket.join("agents:active");
    Logger.silly("Agent connected!");

    emitActiveAgentsToView(io);
  });

  socket.on("agents:busy", () => {
    socket.leave("agents:active");
    Logger.silly(`Agent ${socket.id} is busy`);
  });

  socket.on("views", () => {
    socket.join("views");
    Logger.silly("View connected!");
  });

  socket.on("views:connections", () => {
    emitActiveAgentsToView(io);
  });

  socket.on("disconnect", (reason) => {
    emitActiveAgentsToView(io);
    Logger.silly(`Client disconnected reason: ${reason}`);
  });
};

export default connections;

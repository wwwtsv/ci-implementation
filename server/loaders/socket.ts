import { Server } from "socket.io";
import { Server as HttpServer } from "http";
import Logger from "./logger";

const IoServer = (server: HttpServer): Server => {
  const IoServer = new Server(server);

  Logger.info("Create io server instance");

  return IoServer;
};

export default IoServer;

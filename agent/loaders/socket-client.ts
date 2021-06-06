import { io, Socket } from "socket.io-client";
import config from "../config";

const clientSocket = (): Socket => {
  const socket = io(`ws://localhost:${config.serverPort}`);

  /* Join to agents:active room */
  socket.emit("agents:active");

  return socket;
};

export default clientSocket;

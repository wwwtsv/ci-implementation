import StormDB from "stormdb";
import { Server, Socket } from "socket.io";
import { Build } from "@interfaces/index";
import Logger from "../loaders/logger";

const buildsController = (io: Server, socket: Socket, db: StormDB): void => {
  socket.on("agents:progress", (buildData: Build) => {
    Logger.info(`Build ${buildData.id} arrived in server builds controller`);
    const builds = db.get("builds").value() as Build[];

    const updatedBuilds = builds.map((build) => {
      if (build.id === buildData.id) {
        return buildData;
      }
      return build;
    });

    db.set("builds", updatedBuilds).save();

    io.to(buildData.id).emit("view:buildData", buildData);
  });

  socket.on("agents:finished", () => {
    Logger.info(`Agent: ${socket.id} is finished`);
  });
};

export default buildsController;

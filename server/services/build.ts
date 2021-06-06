import StormDB from "stormdb";
import { v4 } from "uuid";
import { Server } from "socket.io";
import Logger from "../loaders/logger";
import { Build, BuildFormData } from "@interfaces/index";

const build = (buildFormData: BuildFormData, db: StormDB, io: Server): string => {
  const { repositoryUrl, hashCommit, buildCommand } = buildFormData;

  const buildData: Build = {
    id: v4(),
    repositoryUrl: repositoryUrl,
    commitHash: hashCommit,
    startDate: "",
    endDate: "",
    command: buildCommand,
    status: null,
    stdOutput: "",
  };

  db.get("builds").push(buildData);
  db.save();

  io.in("agents:active")
    .fetchSockets()
    .then((sockets) => {
      if (!sockets.length) {
        return;
      }

      sockets[0].emit("agents:build", buildData);
      Logger.info(`Send build data to ${sockets[0].id} agent`);
    });

  return buildData.id;
};

export default build;

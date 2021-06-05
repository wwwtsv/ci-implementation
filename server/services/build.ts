import { Build, BuildFormData } from "../interfaces";
import StormDB from "stormdb";
import uuid from "uuid";
import { Server } from "socket.io";
import Logger from "../loaders/logger";

const build = (buildFormData: BuildFormData, db: StormDB, io: Server): string => {
  const { repository, hashCommit, buildCommand } = buildFormData;

  const buildData: Build = {
    id: uuid.v4(),
    repository: repository,
    commitHash: hashCommit,
    startDate: "",
    endDate: "",
    command: buildCommand,
    status: null,
    stdOutput: "",
  };

  db.get("builds").push(buildData);
  db.save();

  io.to("agents:active").emit("agents:build", buildData);

  return buildData.id;
};

export default build;

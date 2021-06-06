import Logger from "../loaders/logger";
import { Socket } from "socket.io-client";
import { execSync } from "child_process";
import agentConfig from "../config";
import path from "path";
import { Build } from "@interfaces/index";

const build = (socket: Socket): void => {
  socket.on("agents:build", (buildData: Build) => {
    Logger.info(`Agent ${socket.id} get ${JSON.stringify(buildData)} build data`);

    socket.emit("agents:busy");
    const newBuildData = buildData;
    const cwd = agentConfig.repositoryFolder;
    const repositoryName = newBuildData.repositoryUrl
      .match(/\w+\.git/)
      ?.toString()
      .split(".")[0];

    newBuildData.startDate = new Date().toString();

    const clone = execSync(`git clone ${buildData.repositoryUrl}`, { cwd: cwd });
    newBuildData.stdOutput += clone.toString();
    Logger.info(`Clone repository ${repositoryName}`);

    const checkout = execSync(`git checkout ${buildData.commitHash}`, {
      cwd: path.resolve(cwd, `${repositoryName}`),
    });
    newBuildData.stdOutput += checkout.toString();
    Logger.info(`Checkout on ${buildData.commitHash}`);

    const execCommands = execSync(`${buildData.command}`, { cwd: path.resolve(cwd, `${repositoryName}`) });
    newBuildData.stdOutput += execCommands.toString();
    Logger.info(`Executed ${buildData.command} commands to the repository`);

    newBuildData.endDate = new Date().toString();
    newBuildData.status = true;

    socket.emit("agents:finished", newBuildData);
    socket.emit("agents:active");
  });
};

export default build;

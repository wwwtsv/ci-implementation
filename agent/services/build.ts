import path from "path";
import { execSync } from "child_process";
import { Socket } from "socket.io-client";
import { Build } from "@interfaces/index";
import { rmdirSync, mkdirSync } from "fs";
import agentConfig from "../config";
import Logger from "../loaders/logger";

const build = (socket: Socket): void => {
  socket.on("agents:build", (buildData: Build) => {
    Logger.info(`Agent ${socket.id} get ${JSON.stringify(buildData)} build data`);
    socket.emit("agents:busy");

    rmdirSync(`${agentConfig.repositoryFolder}/${socket.id}`, { recursive: true });
    Logger.info(`Clear ${agentConfig.repositoryFolder}/${socket.id} folder`);

    mkdirSync(`${agentConfig.repositoryFolder}/${socket.id}`, { recursive: true });
    Logger.info(`Create new ${agentConfig.repositoryFolder}/${socket.id} folder`);

    const newBuildData = buildData;
    const cwd = `${agentConfig.repositoryFolder}/${socket.id}`;
    const repositoryName = newBuildData.repositoryUrl
      .match(/\w+\.git/)
      ?.toString()
      .split(".")[0];

    newBuildData.startDate = new Date().toString();

    try {
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
    } catch (e) {
      newBuildData.stdOutput += e;
      newBuildData.endDate = new Date().toString();
      newBuildData.status = false;
      socket.emit("agents:finished", newBuildData);
      socket.emit("agents:active");
      Logger.info(`Agent ${socket.id} is finished with error: ${e}`);
    }

    socket.emit("agents:active");
    Logger.info(`Agent ${socket.id} is finished`);
  });
};

export default build;

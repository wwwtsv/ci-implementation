import dotenv from "dotenv";
import path from "path";

process.env.NODE_ENV = process.env.NODE_ENV || "development";
process.env.SERVER_PORT = process.env.PORT || "3000";

const envFound = dotenv.config();
if (envFound.error) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

const agentConfig = {
  serverPort: process.env.SERVER_PORT,
  logs: {
    level: process.env.LOG_LEVEL || "silly",
  },
  repositoryFolder: path.resolve("agent", "repositories"),
};

export default agentConfig;

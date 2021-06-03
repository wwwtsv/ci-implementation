import dotenv from "dotenv";

process.env.NODE_ENV = process.env.NODE_ENV || "development";
process.env.SERVER_PORT = process.env.PORT || "3000";

const envFound = dotenv.config();
if (envFound.error) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  serverPort: process.env.SERVER_PORT,
  logs: {
    level: process.env.LOG_LEVEL || "silly",
  },
};

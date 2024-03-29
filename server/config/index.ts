import dotenv from "dotenv";

process.env.NODE_ENV = process.env.NODE_ENV || "development";
process.env.PORT = process.env.PORT || "3000";

const envFound = dotenv.config();
if (envFound.error) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export const config = {
  port: parseInt(process.env.PORT, 10),
  logs: {
    level: process.env.LOG_LEVEL || "silly",
  },

  api: {
    prefix: "/",
  },
};

export default config;

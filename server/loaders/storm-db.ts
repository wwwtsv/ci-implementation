import StormDB from "stormdb";
import path from "path";
import Logger from "./logger";

const stormDB = (): StormDB => {
  const engine = new StormDB.localFileEngine(path.resolve("server", "db", "db.stormdb"));
  const db = new StormDB(engine);

  db.default({ builds: [] });
  db.save();

  Logger.info(`Create DB instance`);

  return db;
};

export default stormDB;

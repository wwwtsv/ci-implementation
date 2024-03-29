import StormDB from "stormdb";
import path from "path";
import Logger from "./logger";

const stormDB = (): StormDB => {
  const engine = new StormDB.localFileEngine(path.resolve("server", "db", "db.stormdb"), {
    async: true,
  });
  const db = new StormDB(engine);

  db.get("builds").delete();
  db.default({ builds: [] });
  db.save();

  Logger.info(`Create DB instance`);

  return db;
};

export default stormDB;

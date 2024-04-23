import { DataSource } from "typeorm";
import logger from "../logger/logger";
import { AppDataSource } from "./data-source";

async function setDataSource(dataSource: DataSource) {
  try {
    await dataSource.initialize();
    return true;
  } catch (error) {
    logger.error({ error }, "Error setting up data source Postgres");
    throw new Error("Error setting up data source");
  }
}

export { AppDataSource as dataSource, setDataSource };

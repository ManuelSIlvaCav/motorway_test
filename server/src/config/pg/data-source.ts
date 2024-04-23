import "reflect-metadata";
import { DataSource } from "typeorm";
import { StateLog } from "../../components/Statelogs/models/StateLog";
import { Vehicle } from "../../components/Vehicles/models/Vehicle";
import { StateLogsTimestampIndex1713718721958 } from "./migration/1713718721958-StateLogsTimestampIndex";

const HOST = process.env.POSTGRES_HOST || "127.0.0.1";
const USERNAME = process.env.POSTGRES_USER || "postgres";
const PASSWORD = process.env.POSTGRES_PASSWORD || "password";
const DATABASE = process.env.POSTGRES_DB || "motorway";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: HOST,
  port: 5432,
  username: USERNAME,
  password: PASSWORD,
  database: DATABASE,
  synchronize: true,
  logging: false,
  entities: [StateLog, Vehicle],
  migrations: [StateLogsTimestampIndex1713718721958],
  subscribers: [],
  connectTimeoutMS: 5000,
});

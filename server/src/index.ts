import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { Application } from "express";

import logger from "./config/logger/logger";
import { errorHandler } from "./config/middlewares/errorHandler";
import { setDataSource } from "./config/pg";
import { AppDataSource } from "./config/pg/data-source";
import router from "./router";

dotenv.config();

const port = process.env.PORT || 8000;

const app: Application = express();

setDataSource(AppDataSource);

app.use(cors());

// configure the app to use bodyParser()
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());

app.use("/api/v1", router);

app.use(errorHandler);

app.listen(port, () => {
  logger.info(`Server is available at http://localhost:${port}`);
});

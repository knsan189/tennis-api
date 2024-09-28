import app from "./app/app";
import Logger from "./app/logger";
import { SERVER_PORT } from "./config/const";
import AppDateSource from "./config/db.config";

const logger = Logger.getInstance();

app.listen(SERVER_PORT, () => {
  logger.log(`[ ${process.title} ]`);
  logger.log("Server Port :", SERVER_PORT);
});

AppDateSource.initialize().then(() => {
  logger.log("Database connected");
});

import app from "./app/app.js";
import Logger from "./app/logger.js";
import { PROCESS_NAME, LISTEN_PORT } from "./config/const.js";

const logger = Logger.getInstance();

process.title = PROCESS_NAME;

app.listen(LISTEN_PORT, () => {
  logger.log(`[ ${process.title} ]`);
  logger.log("Server Port :", LISTEN_PORT);
});

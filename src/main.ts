import app from "./app/app.js";
import Logger from "./app/logger.js";
import { LISTEN_PORT } from "./config/const.js";

const logger = Logger.getInstance();

app.listen(LISTEN_PORT, () => {
  logger.log("Server Port :", LISTEN_PORT);
});

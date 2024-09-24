import express from "express";
import { SERVER_PORT } from "./config/const.js";
import Logger from "./logger.js";
import messageRouter from "./message/message.router.js";

process.title = "message-api";

const app = express();
const logger = Logger.getInstance();

app.listen(SERVER_PORT, () => {
  logger.log(`[ ${process.title} ]`);
  logger.log("Server Port :", SERVER_PORT);
});

app.use("/message", messageRouter, (req) => {
  logger.log(`[${req.method}] ${req.url}`);
});

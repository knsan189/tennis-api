import express from "express";
import Logger from "./logger.js";
import messageRouter from "../message/message.router.js";

process.title = "message-api";

const app = express();

const logger = Logger.getInstance();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/message", messageRouter, (req) => {
  logger.log(`[${req.method}] ${req.url}`);
});

export default app;

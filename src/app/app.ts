import express from "express";
import Logger from "./logger";
import messageRouter from "../message/message.router";
import AppDateSource from "./dataSource";

const app = express();

const logger = Logger.getInstance();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/message", messageRouter, (req) => {
  logger.log(`[${req.method}] ${req.url}`);
});

AppDateSource.initialize().then(() => {
  logger.log("Database connected");
});

export default app;

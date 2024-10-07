import express from "express";
import Logger from "./logger";
import messageRouter from "../message/message.router";
import AppDateSource from "./dataSource";
import scheduleRouter from "../schedule/schedule.router";

const app = express();
const logger = Logger.getInstance();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  logger.log(`[${req.method}] ${req.url}`);
  next();
});
app.use("/message", messageRouter);
app.use("/schedule", scheduleRouter);

AppDateSource.initialize().then(() => {
  logger.log("Database connected");
});

export default app;

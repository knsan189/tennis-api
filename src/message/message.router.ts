import { Router } from "express";
import MessageService, { Message } from "./message.service.js";
import CommandService from "../command/command.service.js";

const messageRouter = Router();
const messageService = new MessageService();
const commandService = new CommandService();

messageRouter.post<void, unknown, Message, void>("/", (req, res) => {
  try {
    const { room, msg, sender } = req.body;

    const message = {
      room,
      msg: "",
      sender,
    };

    if (msg.startsWith("/")) {
      message.msg = commandService.checkCommand(room, msg, sender);
    }

    res.send({
      data: message,
      code: 200,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({ data: error.message, code: 500 });
    }
  }
});

messageRouter.get("/queue", (req, res) => {
  try {
    const message = messageService.getMessage();
    if (!message) {
      res
        .status(204)
        .send({ data: "No messages left in the queue", code: 204 });
      return;
    }
    res.status(200).send({ data: message, code: 200 });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({ data: error.message, code: 500 });
    }
  }
});

messageRouter.post<void, unknown, Message, void>("/queue", (req, res) => {
  try {
    const message = req.body;
    messageService.addMessage(message);
    res.status(201).send({ data: "Message added to the queue", code: 201 });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({ data: error.message, code: 500 });
    }
  }
});

export default messageRouter;

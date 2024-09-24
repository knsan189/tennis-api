import { Router } from "express";
import MessageService from "./message.service.js";

const messageRouter = Router();

interface Message {
  room: string;
  msg: string;
  sender: string;
}

const messageService = new MessageService();

messageRouter.post<void, unknown, Message, void>("/", (req, res) => {
  try {
    const { room, msg, sender } = req.body;
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({ error: error.message });
    }
  }
});

messageRouter.get("/queue", (req, res) => {
  try {
    const message = messageService.getMessage();

    if (!message) {
      res.status(204).send("No messages left in the queue");
      return;
    }

    res.status(200).send({ data: message });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    }
  }
});

messageRouter.post("/queue", (req, res) => {
  try {
    const { message } = req.body;
    messageService.addMessage(message);
    res.status(201).send("Message added to the queue");
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    }
  }
});

export default messageRouter;

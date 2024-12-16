export interface Message {
  room: string;
  msg: string;
  sender: string;
}

const MessageQueue: Message[] = [];

export default class MessageService {
  public static getInstance() {
    return new MessageService();
  }

  getMessage() {
    return MessageQueue.shift();
  }

  addMessage(message: Message) {
    MessageQueue.push(message);
  }
}

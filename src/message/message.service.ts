export interface Message {
  room: string;
  msg: string;
  sender: string;
}

const MessageQueue: Message[] = [
  { room: "진하늘", msg: "안녕하세요", sender: "김진하" },
];

export default class MessageService {
  getMessage() {
    return MessageQueue.shift();
  }

  addMessage(message: Message) {
    MessageQueue.push(message);
  }
}

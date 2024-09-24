const MessageQueue: string[] = [];

export default class MessageService {
  getMessage() {
    return MessageQueue.shift();
  }

  addMessage(message: string) {
    MessageQueue.push(message);
  }
}

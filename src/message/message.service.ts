const MessageQueue: string[] = ["테스트"];

export default class MessageService {
  getMessage() {
    return MessageQueue.shift();
  }

  addMessage(message: string) {
    MessageQueue.push(message);
  }
}

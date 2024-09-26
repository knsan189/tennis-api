export default class CommandService {
  command = "";

  room = "";

  sender = "";

  commandList: { [key: string]: () => string } = {
    명령어: () => {
      return this.getCommandList();
    },
  };

  getCommandList(): string {
    return Object.keys(this.commandList).join(", ") + " 명령어가 있습니다.";
  }

  checkCommand(room: string, msg: string, sender: string): string {
    this.sender = sender;
    this.room = room;
    this.command = msg.replace("/", "");
    const commandFunc = this.commandList[this.command];

    if (!commandFunc) {
      return "해당 명령어는 존재하지 않습니다.";
    }

    return commandFunc();
  }
}

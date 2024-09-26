export default class CommandService {
  commandList: { [key: string]: () => string } = {
    명령어: () => {
      return this.getCommandList();
    },
  };

  getCommandList(): string {
    return Object.keys(this.commandList).join(", ");
  }

  checkCommand(room: string, msg: string, sender: string): string {
    const command = msg.replace("/", "");
    const commandFunc = this.commandList[command];

    if (!commandFunc) {
      return "해당 명령어는 존재하지 않습니다.";
    }

    return commandFunc();
  }
}

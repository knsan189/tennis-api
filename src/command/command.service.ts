import { format } from "date-fns";
import { ko } from "date-fns/locale";
import MessageService from "../message/message.service.js";
import ScheduleService from "../schedule/schedule.service";

export default class CommandService {
  private command = "";

  private room = "";

  private sender = "";

  private msg = "";

  private scheduleService = new ScheduleService();

  private messageService = new MessageService();

  private commandList: { [key: string]: () => string } = {
    명령어: () => this.sendCommandList(),
    일정: () => this.sendAvailableSchedules(),
  };

  private sendCommandList(): string {
    return Object.keys(this.commandList).join(", ") + "명령어가 있습니다.";
  }

  private sendAvailableSchedules(): string {
    this.messageService.addMessage({
      room: this.room,
      msg: "현재 등록된 일정을 조회합니다.",
      sender: "system",
    });

    this.scheduleService.getAvailableSchedules().then((schedules) => {
      if (schedules.length === 0) {
        this.messageService.addMessage({
          room: this.room,
          msg: "현재 등록된 일정이 없습니다.",
          sender: "system",
        });
      } else {
        let msg = "등록된 일정은 다음과 같습니다.\n";

        schedules.forEach((schedule) => {
          const date = format(schedule.startTime, "MMM do(E)", {
            locale: ko,
          });
          const time = format(schedule.startTime, "a h:mm", { locale: ko });
          msg += `${date}-${schedule.courtName}-${time}\n`;
        });

        this.messageService.addMessage({
          room: this.room,
          msg: msg.trim(),
          sender: "system",
        });
      }
    });

    return "";
  }

  public executeCommand(room: string, msg: string, sender: string): string {
    this.sender = sender;
    this.room = room;
    this.msg = msg;
    this.command = msg.replace("/", "");
    const commandFunc = this.commandList[this.command];

    if (!commandFunc) {
      return "해당 명령어는 존재하지 않습니다.";
    }

    return commandFunc();
  }
}

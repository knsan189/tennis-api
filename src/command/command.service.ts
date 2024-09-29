import { format } from "date-fns";
import { ko } from "date-fns/locale";
import MessageService from "../message/message.service.js";
import ScheduleService from "../schedule/schedule.service";
import UserService from "../user/user.service.js";
import { UserEntity } from "../user/entities/user.entity.js";

export default class CommandService {
  private command = "";

  private room = "";

  private sender = "";

  private msg = "";

  private scheduleService = new ScheduleService();

  private messageService = new MessageService();

  private userSerivce = new UserService();

  private commandList: { [key: string]: () => string } = {
    명령어: () => this.sendCommandList(),
    일정: () => this.sendAvailableSchedules(),
    일정참가: () => this.addParticipant(),
  };

  private sendCommandList(): string {
    return Object.keys(this.commandList).join(", ") + "명령어가 있습니다.";
  }

  private addParticipant(): string {
    const scheduleId = parseInt(this.msg.split(" ")[1], 10);

    if (isNaN(scheduleId)) {
      return "일정 번호를 입력해주세요.";
    }

    this.userSerivce.getUserIsExist(this.sender).then((isExist) => {
      if (!isExist) {
        const user = new UserEntity();
        user.name = this.sender;
        this.userSerivce.addUser(user);
      }
      this.userSerivce.getUserByName(this.sender).then((user) => {
        if (!user) {
          this.messageService.addMessage({
            room: this.room,
            msg: "유저 정보를 찾을 수 없습니다.",
            sender: "system",
          });
        } else {
          this.scheduleService.addParticipant(scheduleId, user.id);
          this.messageService.addMessage({
            room: this.room,
            msg: "일정 참가가 완료되었습니다.",
            sender: "system",
          });
        }
      });
    });

    return "";
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
          msg += `${schedule.id}. ${date}-${schedule.courtName}-${time}-${schedule.participations.length}명\n`;
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

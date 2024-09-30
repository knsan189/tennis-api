import { format } from "date-fns";
import { ko } from "date-fns/locale";
import MessageService from "../message/message.service.js";
import ScheduleService from "../schedule/schedule.service";
import UserService from "../user/user.service.js";
import { UserEntity } from "../user/entities/user.entity.js";

interface Command {
  description: string;
  execute: () => string | Promise<string>;
  alias: string[];
}
export default class CommandService {
  private command = "";

  private room = "";

  private sender = "";

  private msg = "";

  private scheduleService = new ScheduleService();

  private messageService = new MessageService();

  private userSerivce = new UserService();

  private commandList: { [key: string]: Command } = {
    명령어: {
      description: "사용 가능한 명령어를 보여줍니다. ex) /명령어",
      execute: () => this.sendCommandList(),
      alias: ["도움", "help"],
    },
    일정: {
      description: "현재 등록된 일정을 보여줍니다. ex) /일정",
      execute: () => this.sendAvailableSchedules(),
      alias: ["schedule", "schedules", "/일정목록", "/일정조회"],
    },
    일정참가: {
      description: "일정에 참가합니다. ex) /일정참가 [일정 번호]",
      execute: () => this.addParticipant(),
      alias: ["참가", "참여", "참석"],
    },
  };

  private sendCommandList(): string {
    return (
      Object.keys(this.commandList)
        .map((string) => "/" + string)
        .join(", ") + "명령어가 있습니다."
    );
  }

  private async addParticipant(): Promise<string> {
    const scheduleId = parseInt(this.msg.split(" ")[1], 10);

    if (isNaN(scheduleId)) {
      return "올바른 일정 번호를 입력해주세요.";
    }

    const isAvailable = await this.scheduleService.isScheduleAvailable(
      scheduleId
    );

    if (!isAvailable) {
      return "참가 가능한 일정이 아닙니다.";
    }

    let user = await this.userSerivce.getUserByName(this.sender);

    if (!user) {
      this.messageService.addMessage({
        room: this.room,
        msg: "등록된 유저 정보가 없어서 새로 등록합니다.",
        sender: "system",
      });

      const newUser = new UserEntity();
      newUser.name = this.sender;
      user = await this.userSerivce.addUser(newUser);
    }

    await this.scheduleService.addParticipant(scheduleId, user.id);
    this.messageService.addMessage({
      room: this.room,
      msg: "일정 참가가 완료되었습니다.",
      sender: "system",
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

  public executeCommand(
    room: string,
    msg: string,
    sender: string
  ): string | Promise<string> {
    this.sender = sender;
    this.room = room;
    this.msg = msg;
    this.command = msg.replace("/", "");
    let command: Command | undefined = this.commandList[this.command];

    if (!command) {
      command = Object.values(this.commandList).find((command) =>
        command.alias.includes(this.command)
      );
      if (!command) return "해당 명령어는 존재하지 않습니다.";
    }

    return command.execute();
  }
}

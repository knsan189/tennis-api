import { format } from "date-fns";
import { ko } from "date-fns/locale";
import MessageService from "../message/message.service.js";
import ScheduleService from "../schedule/schedule.service.js";
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
    공지사항: {
      description: "공지사항을 확인합니다. ex) /일정",
      execute: () => this.sendNotice(),
      alias: ["공지", "질문", "문의"],
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

  private sendNotice(): string {
    let msg = "";
    msg += "🎾 동호회 자주 묻는 질문🎾 \n";
    msg += "\n";
    msg += "Q. 정모는 어디서 언제 하나요? 🗓️ \n";
    msg +=
      "A. 주로 안양 새물공원에서 진행되며, 매주 주말 오후 시간대에 열려요!코트 예약이 확정되면 일정이 공지됩니다.✅ 보통 2시간, 참석 인원이 많을 경우 3시간 정도 진행해요. \n";
    msg += "\n";

    msg += "Q. 챙겨야 할 준비물이 있나요? 🎒 \n";
    msg +=
      "A. 개인 테니스 채만 가져오시면 됩니다!추가로, 개인 음료수나 물을 챙겨오시면 더 좋아요. \n";
    msg += "\n";

    msg += "Q. 아직 초보인데 참석해도 괜찮을까요? 🐣 \n";
    msg +=
      "A. 당연히 환영이에요! 라켓이 사람을 치지 않는 한(?) 누구나 환영합니다. 😆🏸 레슨과 코트에서 직접 플레이하는 건 느낌이 다르니, 자주 참석하셔서 경험을 쌓으시면 실력 향상에 큰 도움이 될 거예요! \n";
    msg += "\n";
    msg += "Q. 새물공원 말고 다른 코트장을 예약해도 되나요? 🏟️ \n";
    msg += `A. 물론이죠!다른 코트장을 예약하셨다면 미리 말씀해주세요.일정을 조율해 공지사항에 올릴게요! \n`;
    msg += "\n";
    msg += "Q. 동호회비는 어떻게 되나요? 💰";
    msg +=
      "A. 동호회비는 없어요!다만, 정모 때 코트 예약비만 참석 인원 1/N로 나눠요.🎾 추후 테니스 공을 동호회비로 정기 구매할지도 논의 중이에요! \n";
    msg += "\n";
    msg += "Q. 당근 채팅방이 너무 조용해요... 🤔 \n";
    msg += `A. 현재는 카카오톡 오픈채팅방을 주로 이용하고 있어요!당근 채팅방보다 더 편하다는 의견이 많아 활발히 사용 중입니다. \n`;
    msg += "\n";
    msg += `Q. 테니스 정모때 주로 어떤걸 하나요? 🤔🎾 \n`;
    msg += `A. 요즘은 테니스 랠리를 주로 하고 있어요! \n`;
    msg += `🎉 가끔씩은 2:2 복식 게임도 진행하는데, 룰을 모르셔도 걱정 마세요. 친절하게 하나하나 알려드립니다! 😄 즐겁게 운동하며 함께 배워나가요! 💪✨`;
    msg += "\n";
    msg +=
      "💡 추가로 궁금한 점이나 건의 사항이 있다면 언제든 말씀해주세요1 우리 함께 즐겁고 건강하게 테니스 라이프를 즐겨봐요! 😊🎾";

    return msg;
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

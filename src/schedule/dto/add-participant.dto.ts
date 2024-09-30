import { UserEntity } from "../../user/entities/user.entity";
import { ScheduleEntity } from "../entities/schedule.entity";

export interface AddParticipantDto {
  scheduleId: ScheduleEntity["id"];
  participantId: UserEntity["id"];
}

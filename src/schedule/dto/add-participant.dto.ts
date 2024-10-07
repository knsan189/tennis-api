import { UserEntity } from "../../user/entities/user.entity.js";
import { ScheduleEntity } from "../entities/schedule.entity.js";

export interface AddParticipantDto {
  scheduleId: ScheduleEntity["id"];
  participantId: UserEntity["id"];
}

import { LessThan, MoreThan } from "typeorm";
import AppDateSource from "../app/dataSource";
import { ScheduleEntity } from "./entities/schedule.entity";

export default class ScheduleService {
  private scheduleRepository = AppDateSource.getRepository(ScheduleEntity);

  addSchedule(schedule: ScheduleEntity) {
    return this.scheduleRepository.save(schedule);
  }

  deleteSchedule(scheduleId: number) {
    return this.scheduleRepository.delete(scheduleId);
  }

  getAvailableSchedules() {
    return this.scheduleRepository.find({
      where: { startTime: MoreThan(new Date()) },
    });
  }

  getInavailableSchedules() {
    return this.scheduleRepository.find({
      where: { startTime: LessThan(new Date()) },
    });
  }

  deleteInavailableSchedules() {
    return this.scheduleRepository.delete({
      startTime: LessThan(new Date()),
    });
  }

  addParticipant(scheduleId: number, userId: number) {
    return this.scheduleRepository
      .createQueryBuilder()
      .relation(ScheduleEntity, "participations")
      .of(scheduleId)
      .add(userId);
  }
}

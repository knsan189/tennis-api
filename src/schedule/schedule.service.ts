import { LessThan, MoreThan } from "typeorm";
import AppDateSource from "../config/db.config";
import { ScheduleEntity } from "./entities/schedule.entity";

export default class ScheduleService {
  scheduleRepository = AppDateSource.getRepository(ScheduleEntity);

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
}

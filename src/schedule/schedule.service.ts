import { LessThan, MoreThan } from "typeorm";
import AppDateSource from "../app/dataSource";
import { ScheduleEntity } from "./entities/schedule.entity";
import { GetSchedulesDto } from "./dto/get-schdules.dto";

export default class ScheduleService {
  private scheduleRepository = AppDateSource.getRepository(ScheduleEntity);

  getSchedules({ endTime, startTime, courtName }: GetSchedulesDto) {
    return this.scheduleRepository.find({
      where: {
        startTime: MoreThan(new Date(startTime)),
        endTime: endTime ? LessThan(new Date(endTime)) : undefined,
        courtName,
      },
    });
  }

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

  async isScheduleAvailable(scheduleId: number) {
    const schedule = await this.scheduleRepository.findOne({
      where: { id: scheduleId, startTime: MoreThan(new Date()) },
    });
    return Boolean(schedule);
  }

  async addParticipant(scheduleId: number, userId: number) {
    await this.scheduleRepository
      .createQueryBuilder()
      .relation(ScheduleEntity, "participations")
      .of(scheduleId)
      .add(userId);
    return this.scheduleRepository.findOne({ where: { id: scheduleId } });
  }
}

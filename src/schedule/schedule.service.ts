import { LessThan, MoreThan } from "typeorm";
import AppDateSource from "../app/dataSource.js";
import { ScheduleEntity } from "./entities/schedule.entity.js";
import { GetScheduleListDto } from "./dto/get-schdule-list.dto.js";

export default class ScheduleService {
  private scheduleRepository = AppDateSource.getRepository(ScheduleEntity);

  getSchedules({ endTime, startTime, courtName, name }: GetScheduleListDto) {
    return this.scheduleRepository.find({
      where: {
        startTime: MoreThan(new Date(startTime)),
        endTime: endTime ? LessThan(new Date(endTime)) : undefined,
        courtName: courtName ? courtName : undefined,
        name: name ? name : undefined,
      },
    });
  }

  addSchedule(schedule: ScheduleEntity) {
    return this.scheduleRepository.save(schedule);
  }

  editSchedule(scheduleId: number, schedule: ScheduleEntity) {
    return this.scheduleRepository.update(scheduleId, schedule);
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

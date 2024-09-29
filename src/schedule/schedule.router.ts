import { Router } from "express";
import { AddScheduleDto } from "./dto/add-schedule.dto";
import { ScheduleEntity } from "./entities/schedule.entity";
import ScheduleService from "./schedule.service";

const scheduleRouter = Router();
const scheduleService = new ScheduleService();

scheduleRouter.post<void, unknown, AddScheduleDto>("/", async (req, res) => {
  try {
    const schedule = new ScheduleEntity();
    schedule.startTime = new Date();
    schedule.startTime.setHours(schedule.startTime.getHours() + 5);
    schedule.endTime = new Date();
    schedule.courtName = req.body.courtName;
    schedule.dateFixed = req.body.dateFixed;
    await scheduleService.addSchedule(schedule);
    res.status(201).send({ data: "Schedule added", code: 201 });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({ data: error.message, code: 500 });
    }
  }
});

export default scheduleRouter;

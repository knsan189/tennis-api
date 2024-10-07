import { Router } from "express";
import { AddScheduleDto } from "./dto/add-schedule.dto.js";
import { ScheduleEntity } from "./entities/schedule.entity.js";
import ScheduleService from "./schedule.service.js";
import { AddParticipantDto } from "./dto/add-participant.dto.js";
import { GetSchedulesDto } from "./dto/get-schdules.dto.js";

const scheduleRouter = Router();
const scheduleService = new ScheduleService();

scheduleRouter.get<void, unknown, void, GetSchedulesDto>(
  "/",
  async (req, res) => {
    try {
      const dto = req.query;
      const schedules = await scheduleService.getSchedules(dto);
      res.status(200).send({ data: schedules, code: 200 });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).send({ data: error.message, code: 500 });
      }
    }
  }
);

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

scheduleRouter.post<void, unknown, AddParticipantDto>(
  "/participant",
  async (req, res) => {
    try {
      const { scheduleId, participantId } = req.body;
      await scheduleService.addParticipant(scheduleId, participantId);
      res.status(201).send({ data: "Participant added", code: 201 });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).send({ data: error.message, code: 500 });
      }
    }
  }
);

export default scheduleRouter;

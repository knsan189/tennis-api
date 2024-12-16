import { Router } from "express";
import { AddScheduleRequest } from "./dto/add-schedule.dto.js";
import { ScheduleEntity } from "./entities/schedule.entity.js";
import ScheduleService from "./schedule.service.js";
import { AddParticipantDto } from "./dto/add-participant.dto.js";
import { EditScheduleRequest } from "./dto/edit-schedule.dto.js";
import { GetScheduleListRequest } from "./dto/get-schdule-list.dto.js";
import { RemoveSchduleRequest } from "./dto/remove-schedule.dto.js";

const scheduleRouter = Router();
const scheduleService = new ScheduleService();

scheduleRouter.get("/", async (req: GetScheduleListRequest, res) => {
  try {
    const dto = req.query;
    const schedules = await scheduleService.getSchedules(dto);
    res.status(200).send({ data: schedules, code: 200 });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({ data: error.message, code: 500 });
    }
  }
});

scheduleRouter.post("/", async (req: AddScheduleRequest, res) => {
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

scheduleRouter.put("/:id", async (req: EditScheduleRequest, res) => {
  try {
    const scheduleId = Number(req.params);
    const schedule = req.body;
    await scheduleService.editSchedule(scheduleId, schedule);
    res.status(200).send({ data: "Schedule edited", code: 200 });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({ data: error.message, code: 500 });
    }
  }
});

scheduleRouter.delete("/:id", async (req: RemoveSchduleRequest, res) => {
  try {
    const scheduleId = Number(req.params);
    await scheduleService.deleteSchedule(scheduleId);
    res.status(200).send({ data: "Schedule deleted", code: 200 });
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

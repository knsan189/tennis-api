import { Request } from "express";
import { ScheduleEntity } from "../entities/schedule.entity";

export type RemoveSchduleRequest = Request<
  { id: ScheduleEntity["id"] },
  unknown,
  unknown,
  void
>;

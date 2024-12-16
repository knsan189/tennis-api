import { Request } from "express";
import { ScheduleEntity } from "../entities/schedule.entity";

export type RemoveSchduleRequest = Request<
  ScheduleEntity["id"],
  unknown,
  unknown,
  void
>;

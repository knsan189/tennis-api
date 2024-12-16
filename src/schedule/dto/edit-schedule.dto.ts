import { Request } from "express";
import { ScheduleEntity } from "../entities/schedule.entity";

export type EditScheduleDto = ScheduleEntity;

export type EditScheduleRequest = Request<
  { id: ScheduleEntity["id"] },
  unknown,
  EditScheduleDto
>;

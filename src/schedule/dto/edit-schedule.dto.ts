import { Request } from "express";
import { ScheduleEntity } from "../entities/schedule.entity";

export type EditScheduleDto = ScheduleEntity;

export type EditScheduleRequest = Request<
  ScheduleEntity["id"],
  unknown,
  EditScheduleDto
>;

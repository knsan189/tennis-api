import { Request } from "express";
import { ScheduleEntity } from "../entities/schedule.entity";

export type AddScheduleDto = Omit<ScheduleEntity, "id">;
export type AddScheduleRequest = Request<void, unknown, AddScheduleDto, void>;

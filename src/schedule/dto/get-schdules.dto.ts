import { Request } from "express";

export type GetSchedulesRequest = Request<
  void,
  unknown,
  unknown,
  GetSchedulesDto
>;

export interface GetSchedulesDto {
  startTime: string;
  endTime?: string;
  courtName?: string;
}

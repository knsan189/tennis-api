import { Request } from "express";

export type GetScheduleListRequest = Request<
  void,
  unknown,
  unknown,
  GetScheduleListDto
>;

export interface GetScheduleListDto {
  startTime: string;
  endTime?: string;
  courtName?: string;
  name?: string;
}

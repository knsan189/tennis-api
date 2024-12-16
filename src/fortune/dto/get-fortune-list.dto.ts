import { Request } from "express";

export type GetFortuneListRequest = Request<
  void,
  void,
  unknown,
  GetFortuneListDto
>;

export interface GetFortuneListDto {
  count?: number;
}

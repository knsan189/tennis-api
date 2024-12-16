import { Request } from "express";

export type GetRandomFortuneRequest = Request<
  void,
  void,
  unknown,
  GetRandomFortuneDto
>;

export interface GetRandomFortuneDto {
  userName: string;
}

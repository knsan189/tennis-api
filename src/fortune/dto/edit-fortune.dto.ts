import { Request } from "express";
import { FortuneEntity } from "../entities/fortune.entity";

export type EditFortuneDto = FortuneEntity;
export type EditFortuneRequest = Request<
  FortuneEntity["id"],
  void,
  EditFortuneDto
>;

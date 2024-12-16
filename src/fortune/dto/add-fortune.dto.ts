import { Request } from "express";
import { FortuneEntity } from "../entities/fortune.entity";

export type AddFortuneDto = Omit<FortuneEntity, "id">;
export type AddFortuneRequest = Request<void, void, AddFortuneDto, void>;

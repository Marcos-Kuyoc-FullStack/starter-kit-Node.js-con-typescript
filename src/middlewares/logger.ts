import { Request, Response } from "express";
import { logger } from "../adapters/logger";

export const loggerMiddleware = (req: Request, res: Response, next: Function) => {
  logger.info(`${req.method} ${req.originalUrl}`);
  next()
}
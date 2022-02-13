import { HttpError } from "http-errors";
import { Request, Response } from "express";
import { logger } from "../adapters/logger";

export const errorHandler = (error: HttpError, req: Request, res: Response, next: Function) => {
  if (error) {
    logger.error(`${error.statusCode} ${error.message}`);
    return res.status(error.statusCode).json(error);
  }
  next();
}
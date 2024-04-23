import { NextFunction, Request, Response } from "express";
import logger from "../logger/logger";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next?: NextFunction
) => {
  const errStatus = err.statusCode || 500;
  const errMsg = err.message || "Something went wrong";

  logger.error(
    {
      errorMessage: errMsg,
      errorStack: err.stack,
      status: errStatus,
      url: req.url,
      method: req.method,
      body: req.body,
      params: req.params,
      query: req.query,
    },
    "Error Handler Middleware"
  );

  res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMsg,
    stack: process.env.ENVIRONMENT === "dev" ? err.stack : {},
  });
};

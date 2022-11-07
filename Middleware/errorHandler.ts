import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/custom-error";

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error = { ...err };

  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({
      errors: err.serializeErrors(),
    });
  }

  if (err.message.includes("duplicate")) {
    error.message = "Resource already exists";
  }

  res.status(400).json({
    errors: [
      {
        message: error.message || "Invalid Request Body",
        error: err,
      },
    ],
  });
};

export default errorHandler;

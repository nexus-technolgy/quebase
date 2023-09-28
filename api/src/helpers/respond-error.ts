import { NextFunction, Request, Response } from "express";
import { HttpsError } from "firebase-functions/v2/https";
import { ValidateError } from "tsoa";

export const respondError = (
  error: unknown,
  _request: Request,
  response: Response,
  next: NextFunction
): Response => {
  const logger = response.locals.logger ?? console;
  let message = "Internal server error";

  if (response.headersSent) {
    logger.warn("Headers already sent");
    next(error);
  }

  // all thrown errors _should_ be extensions of the base `HttpsError` class constructor, except the TSOA validation errors
  if (error instanceof HttpsError) {
    if (error.httpErrorCode.status >= 500) {
      logger.error(error.toJSON());
    } else {
      logger.warn(error.toJSON());
    }
    return response.status(error.httpErrorCode.status).send(error.toJSON());
  }

  if (error instanceof ValidateError) {
    if (error.status >= 500) {
      logger.error(error);
    } else {
      logger.warn(error);
    }
    message = "Input validation error";
    const details = error.fields;
    return response.status(error.status).send({ message, details });
  }

  if (error instanceof ReferenceError) {
    logger.error(error);
    const details = error.message;
    return response.status(500).send({ message, details });
  }

  logger.error(message, error);
  return response.status(500).send(message);
};

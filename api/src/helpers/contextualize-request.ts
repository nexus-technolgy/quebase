import { randomUUID } from "node:crypto";

import { NextFunction, Request, Response } from "express";

import { R } from "../models";
import { createLogger } from "../services";
import { authorizeRequest } from ".";

export const contextualizeRequest = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  // extract the structured log values from the request
  const { hostname, method, path, query } = request;
  const id =
    request.headers["x-correlation-id"]?.toString() ||
    request.headers["correlation-id"]?.toString() ||
    randomUUID();
  const correlation: R = {
    id,
    hostname,
    method,
    path,
    query,
  };
  if (!Object.keys(query).length) delete correlation.query;

  // add the correlation id to the response before any other processing
  response.header({ "x-correlation-id": id });

  // create a logger with the defined correlation object, and add it to response.locals immediately for use in error handling
  const logger = createLogger(correlation);
  response.locals.logger = logger;

  // extract required headers to serialize and log (if required)
  if (logger["logLimit"] > 3) {
    const requiredHeaders = ["authorization", "sid"];
    const availableHeaders = Object.keys(request.headers);
    logger.debug(
      "Extracting request headers",
      requiredHeaders.map((h) => {
        return { [h]: availableHeaders.includes(h) ? true : false };
      })
    );
  }

  const { authorization } = request.headers;
  const auth =
    request.auth ?? (await authorizeRequest(logger, authorization).catch((error) => next(error)));

  // mutate the request to add context and auth data
  request.context = { id, logger };
  request.auth = auth;

  next();
};

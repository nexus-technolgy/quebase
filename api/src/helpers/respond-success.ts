import { HttpStatusCode } from "axios";
import { Response } from "firebase-functions/v1";

import { HttpStatusMessage, R } from "../models";

export const respondSuccess = (payload: unknown, response: Response): Response | void => {
  const logger = response.locals.logger ?? console;
  const headers = response.getHeaders();
  let status: HttpStatusCode = HttpStatusCode.Ok,
    data: R | undefined = { message: "OK" };

  if (typeof payload == "string") {
    data.message = payload;
  }

  if (typeof payload == "number") {
    status = payload;
    data.message = HttpStatusMessage[status];
  }

  if (payload && typeof payload == "object") {
    const entries = Object.entries(payload);
    data = {};
    for (const [key, value] of entries) {
      if (key == "status") status = Number(value);
      else data[key] = value;
    }
  }

  response.status(status);

  if (
    data &&
    typeof data.pipe === "function" &&
    data.readable &&
    typeof data._read === "function"
  ) {
    logger.info("HTTP Response", { status, headers, data: "[ pipe ]" });
    return data.pipe(response);
  } else if (status == HttpStatusCode.NoContent) {
    logger.info("HTTP Response", { status, headers });
    return response.end();
  } else {
    logger.info("HTTP Response", { status, headers, data });
    return response.json(data);
  }
};

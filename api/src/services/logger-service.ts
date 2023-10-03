import { Logger, LogLevel, type LogObject, ServerMode } from "@nexustech/logger";
import { logger } from "firebase-functions/v2";

const gcpSeverity: Record<LogLevel, logger.LogSeverity> = {
  [LogLevel.LOG]: "INFO",
  [LogLevel.ERROR]: "ERROR",
  [LogLevel.WARN]: "WARNING",
  [LogLevel.INFO]: "INFO",
  [LogLevel.DEBUG]: "DEBUG",
  [LogLevel.TRACE]: "DEBUG",
};

const flattenPayload = (payload: unknown[]) => {
  switch (payload.length) {
    case 0:
      return undefined;
    case 1:
      return payload[0];
    default:
      return { ...payload };
  }
};

const gcpLogger = (logEntry: unknown | LogObject) => {
  const { correlation, message: payload, severity } = logEntry as LogObject;
  const message = typeof payload[0] == "string" ? String(payload.shift()) : undefined;
  const jsonPayload = flattenPayload(payload);
  logger.write({ severity: gcpSeverity[severity], message, correlation, jsonPayload });
};

export const createLogger = (correlation?: string | Record<string, unknown>) =>
  new Logger({ correlation, serverMode: ServerMode.GCP, serverCall: gcpLogger });

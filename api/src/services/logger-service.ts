import { Logger, LogLevel, LogObject, ServerMode } from "@nexustech/logger";
import { LogSeverity, write } from "firebase-functions/lib/logger";

const gcpSeverity: Record<LogLevel, LogSeverity> = {
  [LogLevel.LOG]: "INFO",
  [LogLevel.ERROR]: "ERROR",
  [LogLevel.WARN]: "WARNING",
  [LogLevel.INFO]: "INFO",
  [LogLevel.DEBUG]: "DEBUG",
  [LogLevel.TRACE]: "DEBUG",
};

const serverCall = (logEntry: unknown | LogObject) => {
  const { correlation, message: payload, severity } = logEntry as LogObject;
  write({ severity: gcpSeverity[severity], correlation, ...payload });
};
export const createLogger = (correlation?: string | Record<string, unknown>) =>
  new Logger({ correlation, serverMode: ServerMode.GCP, serverCall });

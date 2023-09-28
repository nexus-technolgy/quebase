import { Logger } from "@nexustech/logger";

export const createLogger = (correlation?: string | Record<string, unknown>) => new Logger({ correlation, serverMode: true });

import { Logger } from "@nexustech/logger";
import { AuthData } from "firebase-functions/lib/common/providers/https";

export interface ServiceConstructorOptions {
  auth: AuthData;
  logger?: Logger | Console;
}

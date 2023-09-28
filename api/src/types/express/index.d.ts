import { Logger } from "@nexustech/logger";
import { AuthData } from "firebase-functions/lib/common/providers/https";

// to make the file a module and avoid the TypeScript error
export {};

declare global {
  namespace Express {
    export interface Request {
      auth: AuthData;
      context: {
        id: string;
        logger: Logger;
      };
    }
  }
}

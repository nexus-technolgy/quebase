import { FunctionsErrorCode, HttpsError } from "firebase-functions/v2/https";

const code: FunctionsErrorCode = "permission-denied";

export type ForbiddenErrorParams = { message: string; details?: unknown };

export class ForbiddenError extends HttpsError {
  id?: string;
  constructor(params: string | ForbiddenErrorParams) {
    super(code, typeof params == "string" ? params : params.message, typeof params == "object" ? params.details : undefined);
  }
}

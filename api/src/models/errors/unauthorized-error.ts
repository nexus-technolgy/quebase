import { FunctionsErrorCode, HttpsError } from "firebase-functions/v2/https";

const code: FunctionsErrorCode = "unauthenticated";

export type UnauthorizedErrorParams = { message: string; details?: unknown };

export class UnauthorizedError extends HttpsError {
  id?: string;
  constructor(params: string | UnauthorizedErrorParams) {
    super(code, typeof params == "string" ? params : params.message, typeof params == "object" ? params.details : undefined);
  }
}

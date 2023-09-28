import { FunctionsErrorCode, HttpsError } from "firebase-functions/v2/https";

const code: FunctionsErrorCode = "invalid-argument";

export type ReferenceErrorParams = { message: string; details?: unknown };

export class ReferenceError extends HttpsError {
  id?: string;
  constructor(params: string | ReferenceErrorParams) {
    super(code, typeof params == "string" ? params : params.message, typeof params == "object" ? params.details : undefined);
  }
}

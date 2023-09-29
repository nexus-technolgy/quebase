import { FunctionsErrorCode, HttpsError } from "firebase-functions/v2/https";

const code: FunctionsErrorCode = "not-found";

export type NotFoundErrorParams = { message: string; details?: unknown };

export class NotFoundError extends HttpsError {
  id?: string;
  constructor(params: string | NotFoundErrorParams) {
    super(
      code,
      typeof params == "string" ? params : params.message,
      typeof params == "object" ? params.details : undefined
    );
  }
}

import { HttpStatusCode } from "axios";

export const HttpStatusMessage: Partial<Record<HttpStatusCode, string>> = {
  [HttpStatusCode.Continue]: "Continue",
  [HttpStatusCode.Ok]: "OK",
  [HttpStatusCode.Created]: "Created",
  [HttpStatusCode.Accepted]: "Accepted",
  [HttpStatusCode.NoContent]: undefined,
};

import { Logger } from "@nexustech/logger";
import { getAuth } from "firebase-admin/auth";
import { AuthData } from "firebase-functions/lib/common/providers/https";

import { UnauthorizedError, UnauthorizedErrorParams } from "../models";

export const authorizeRequest = async (
  logger: Logger,
  authorization: string | undefined
): Promise<AuthData> => {
  const e: UnauthorizedErrorParams = {
    message: "Unauthorized",
  };

  if (!authorization || !authorization.startsWith("Bearer ")) {
    e.details = ["No Authorization Header was found"];
    throw new UnauthorizedError(e);
  }

  logger.debug({ authorization });
  const jwt = authorization ? authorization.split("Bearer ")[1] : "";

  if (!jwt) {
    e.details = ["Authorization was not in the expected format"];
    throw new UnauthorizedError(e);
  }

  try {
    const token = await getAuth().verifyIdToken(jwt);
    logger.debug("JWT Authorized", token);

    const { uid } = token;
    // const scopes = scope ? scope.split[" "] : [];
    // if (scopes.length) token.scopes = scopes;

    return { uid, token };
  } catch (error) {
    if (error instanceof Error) {
      e.details = error.message.startsWith("Firebase ID token has expired")
        ? ["Token has expired"]
        : ["Unable to extract valid data from authorization"];
    }
    throw new UnauthorizedError(e);
  }
};

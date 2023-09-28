import { Notify } from "quasar";

import { logger } from "@/boot";
import { NotifyError } from "@/models";

export const feedbackWrapper = async <A = undefined, T = void>(fn: (args: A) => Promise<T> | T, args: A) => {
  try {
    return await fn(args);
  } catch (error) {
    if (error instanceof NotifyError) Notify.create(error);
    else {
      logger.error(error);
      throw error;
    }
  }
};

import { logger } from "@/boot";
import { localStore } from "@/services";

export const throttle = async <A = unknown, T = void>(
  fn: (args: A) => Awaited<T>,
  args: A,
  period: number
): Promise<Awaited<T> | undefined> => {
  const now = Date.now();
  if (localStore.has(fn.name)) {
    const expiry = localStore.get<number>(fn.name, 0);
    if (now > expiry) {
      localStore.remove(fn.name);
      return fn(args);
    } else {
      logger.debug("Throttled call to", fn.name);
      return;
    }
  } else {
    localStore.set(fn.name, now + period);
    return fn(args);
  }
};

import pkg from "../../package.json";
import { logger } from "../boot";

type StorageType = number | string | boolean | undefined | null;
type StorageItem = StorageType | StorageType[] | object | Date;

const r = /[^\w.]/g;

const prefix = (key: string, usePrefix: boolean): string =>
  usePrefix
    ? `${pkg.name ?? "unknown"}.app.${key.replace(r, "")}`
    : key.replace(r, "");

const has = (key: string, usePrefix = true): boolean => {
  const keys = Object.keys(localStorage);
  return keys.includes(prefix(key, usePrefix));
};

const get = <T = unknown>(
  key: string,
  initialValue?: StorageItem,
  usePrefix = true
): T => {
  logger.debug("localStore: get() request", { key, usePrefix, initialValue });
  if (localStore.has(key, usePrefix)) {
    const [sType, sVal] = localStorage
      .getItem(prefix(key, usePrefix))
      ?.split(/\|(.*)/s) ?? ["undefined", ""];
    logger.debug("localStore: get() result", {
      sKey: prefix(key, usePrefix),
      sType,
      sVal,
    });
    if (sType == "number") return Number(sVal) as T;
    if (sType == "boolean") return sVal === "true" ? (true as T) : (false as T);
    if (sType == "string") return sVal as T;
    if (sType == "object") return JSON.parse(sVal) as T;
    if (sType == "date") {
      const obj = new Date();
      obj.setTime(Number(sVal));
      return obj as T;
    }
    return undefined as T;
  } else {
    return initialValue as T;
  }
};

const set = (key: string, value: StorageItem, usePrefix = true): void => {
  logger.debug("localStore: set() request", { key, usePrefix, value });
  const sType = value instanceof Date ? "date" : typeof value;
  const sVal =
    value instanceof Date
      ? value.getTime()
      : sType == "object"
        ? JSON.stringify(value)
        : value?.toString();
  logger.debug("localStore: set() result", {
    sKey: prefix(key, usePrefix),
    sType,
    sVal,
  });
  localStorage.setItem(prefix(key, usePrefix), `${sType}|${sVal}`);
};

const remove = (key: string, usePrefix = true): boolean => {
  logger.debug("localStore: remove() request", { key, usePrefix });
  if (localStore.has(key, usePrefix)) {
    logger.debug("localStore: remove() success", true);
    localStorage.removeItem(prefix(key, usePrefix));
    return true;
  }
  logger.debug("localStore: remove() failed", false);
  return false;
};

const clearAll = (): void => {
  logger.debug("localStore: clearAll()");
  localStorage.clear();
};

const clearLocal = (): void => {
  logger.debug(
    "localStore: clearLocal() searching",
    localStorage.length,
    "item(s)"
  );
  if (!localStorage.length) return;
  let i = 0;
  Object.entries(localStorage).forEach(([sKey, value], index) => {
    const [sType, sVal] = value.split(/\|(.*)/s);
    if (
      sType &&
      sVal !== undefined &&
      value.match(/^(number)|(boolean)|(string)|(object)|(date)|(undefined)/)
    ) {
      logger.debug(`localStore: clearLocal() item ${index}`, {
        sKey,
        sType,
        sVal,
      });
      localStorage.removeItem(sKey);
      i++;
    }
  });
  logger.debug("localStore: clearLocal() removed", i, "item(s)");
};

export const localStore = {
  clearAll,
  clearLocal,
  has,
  get,
  set,
  remove,
};

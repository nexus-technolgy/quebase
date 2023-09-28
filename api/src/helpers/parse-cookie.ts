import { R } from "../models";

export const parseCookie = (cookie: string | string[]): R<string> => {
  const cookies: R<string> = {};

  const items = typeof cookie == "string" ? cookie.split(/;\s*/) : cookie;
  for (const index in items) {
    const parts = items[index].split("=");
    cookies[parts[0]] = parts[1];
  }

  return cookies;
};

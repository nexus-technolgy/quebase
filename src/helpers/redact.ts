const redactList: string[] = import.meta.env.VITE_REDACT_KEYS?.split("|") ?? [];

export const redact = (input: string | number | unknown, parent?: string): typeof input => {
  if (input === undefined) return undefined;
  if (input === null) return null;
  if ((input && typeof input == "string") || typeof input == "number") {
    const text = String(input);
    if (text.length > 64)
      return text.slice(0, 4) + "*".repeat(48) + `(${text.length - 52} more)...${text.slice(-4)}`;
    if (text.length > 12) return text.slice(0, 2) + "*".repeat(text.length - 6) + text.slice(-4);
    if (text.length > 6) return text.slice(0, 1) + "*".repeat(text.length - 2) + text.slice(-1);
    return "*".repeat(text.length);
  }
  if (input && Array.isArray(input)) {
    return input.map((item) => {
      if (item && typeof item === "object") return redact(item, parent);
      if (parent && redactList.some((secret) => parent.includes(secret))) return redact(item);
      return item;
    });
  } else if (input && typeof input === "object") {
    const redacted: { [key: string]: unknown } = {};
    Object.entries(input).forEach(([key, val]) => {
      redacted[key] =
        redactList.some((secret) => key.includes(secret) || (parent && parent.includes(secret))) ||
        typeof val == "object"
          ? redact(val, key)
          : val;
    });
    return redacted;
  }
  return input;
};

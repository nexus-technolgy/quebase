// configurable generic Object/Record
export type R<T = unknown> = Record<string, T>;

// from https://stackoverflow.com/a/49579497/3334966
type IfEquals<X, Y, A = X, B = never> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? A : B;

// from https://stackoverflow.com/a/49579497/3334966
export type WritableKeys<T> = {
  [P in keyof T]-?: IfEquals<{ [Q in P]: T[P] }, { -readonly [Q in P]: T[P] }, P>;
}[keyof T];

// from https://stackoverflow.com/a/49579497/3334966
export type ReadonlyKeys<T> = {
  [P in keyof T]-?: IfEquals<{ [Q in P]: T[P] }, { -readonly [Q in P]: T[P] }, never, P>;
}[keyof T];

// from https://stackoverflow.com/a/49579497/3334966
export type RequiredKeys<T> = {
  [K in keyof T]-?: R extends { [P in K]: T[K] } ? never : K;
}[keyof T];

// from https://stackoverflow.com/a/49579497/3334966
export type OptionalKeys<T> = {
  [K in keyof T]-?: R extends { [P in K]: T[K] } ? K : never;
}[keyof T];

// https://github.com/lukeautry/tsoa/issues/911#issuecomment-781924658
// Expands a Pick or Omit Type in to a full type
export type Expand<T> = { [K in keyof T]: T[K] };

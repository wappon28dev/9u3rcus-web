export async function waitMs(ms: number): Promise<void> {
  await new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

type Entries<T> = Array<
  keyof T extends infer U ? (U extends keyof T ? [U, T[U]] : never) : never
>;
export function getKeys<T extends Record<string, unknown>>(
  obj: T
): Array<keyof T> {
  return Object.keys(obj);
}
export function getValues<T extends Record<string, any>>(
  obj: T
): Array<T[keyof T]> {
  return Object.values(obj);
}
export function getEntries<T extends Record<string, unknown>>(
  obj: T
): Entries<T> {
  return Object.entries(obj) as Entries<T>;
}
export function fromEntries<T extends Record<string, unknown>>(
  entries: Entries<T>
): T {
  return Object.fromEntries(entries) as T;
}

export function formatDate(
  date: Date,
  format: "YYYY.MM" | "YYYY.MM.DD"
): string {
  switch (format) {
    case "YYYY.MM":
      return `${date.getFullYear()}.${date.getMonth() + 1}`;
    case "YYYY.MM.DD":
      return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;
    default:
      throw new Error("Invalid format");
  }
}

/**
 * NOTE: This fn is only used in server-side code (in `dev`/`build`);
 *       Do not use this in client-side code.
 * @param path path WITHOUT leading slash
 * @returns URL to the `/public` path
 */
export const getPublicFilePath = (path: string): string =>
  `http://localhost:${import.meta.env.ASSETS_LOCAL_SERVER_PORT}/${path}`;

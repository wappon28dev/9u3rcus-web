import { INFO } from "./config";

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
  format: "YYYY.MM" | "YYYY.MM.DD" | "YYYY-MM-DD HH:mm:ss"
): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");
  const second = String(date.getSeconds()).padStart(2, "0");

  switch (format) {
    case "YYYY.MM":
      return `${year}.${month}`;
    case "YYYY.MM.DD":
      return `${year}.${month}.${day}`;
    case "YYYY-MM-DD HH:mm:ss":
      return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    default:
      throw new Error("Invalid format");
  }
}

export const LOCAL_STORAGE_VERSION = "1";
export function getLocalStorageKey(key: string, trailingColon = false): string {
  return `${INFO.id}.v${LOCAL_STORAGE_VERSION}.${key}${trailingColon ? ":" : ""}`;
}

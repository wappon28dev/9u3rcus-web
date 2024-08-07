import { match } from "ts-pattern";
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
  obj: T,
): Array<keyof T> {
  return Object.keys(obj);
}
export function getValues<T extends Record<string, any>>(
  obj: T,
): Array<T[keyof T]> {
  return Object.values(obj);
}
export function getEntries<T extends Record<string, unknown>>(
  obj: T,
): Entries<T> {
  return Object.entries(obj) as Entries<T>;
}
export function fromEntries<T extends Record<string, unknown>>(
  entries: Entries<T>,
): T {
  return Object.fromEntries(entries) as T;
}

export type ArrayElem<ArrayType extends readonly unknown[]> =
  ArrayType extends ReadonlyArray<infer ElementType> ? ElementType : never;

export function formatDate(
  date: Date,
  format: "YYYY.MM" | "YYYY.MM.DD" | "YYYY-MM-DD HH:mm:ss" | "YYYY年M月d日",
): string {
  const year = date.getFullYear();

  const month = String(date.getMonth() + 1);
  const monthWithPad = month.padStart(2, "0");

  const day = String(date.getDate());
  const dayWithPad = day.padStart(2, "0");

  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");
  const second = String(date.getSeconds()).padStart(2, "0");

  return match(format)
    .with("YYYY.MM", () => `${year}.${monthWithPad}`)
    .with("YYYY.MM.DD", () => `${year}.${monthWithPad}.${dayWithPad}`)
    .with(
      "YYYY-MM-DD HH:mm:ss",
      () => `${year}-${monthWithPad}-${dayWithPad} ${hour}:${minute}:${second}`,
    )
    .with("YYYY年M月d日", () => `${year}年${month}月${day}日`)
    .exhaustive();
}

export const LOCAL_STORAGE_VERSION = "1";
export function getLocalStorageKey(key: string, trailingColon = false): string {
  return `${INFO.id}.v${LOCAL_STORAGE_VERSION}.${key}${trailingColon ? ":" : ""}`;
}

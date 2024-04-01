import type { Result, ResultAsync } from "neverthrow";

// ref: neverthrow/dist/index.d.ts L53-56
export type InferOkTypes<R> = R extends Result<infer T, unknown> ? T : never;
export type InferErrTypes<R> = R extends Result<unknown, infer E> ? E : never;
export type InferAsyncOkTypes<R> =
  R extends ResultAsync<infer T, unknown> ? T : never;
export type InferAsyncErrTypes<R> =
  R extends ResultAsync<unknown, infer E> ? E : never;

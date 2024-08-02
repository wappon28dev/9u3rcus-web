/* eslint-disable no-console */
import path from "path";

export const PUBLIC_PATH = path.join(import.meta.dir, "..", "..", "public");
export type ChildrenFlat = Array<{
  downloadUrl: string;
  name: string;
  filePath: string;
  size: number;
  lastModifiedDateTime: string;
}>;

/* eslint-disable */
// ref: https://zenn.dev/sora_kumo/articles/539d7f6e7f3c63
export const Parallels = (ps = new Set<Promise<unknown>>()) => ({
  add: (p: Promise<unknown>) =>
    ps.add(!!p.then(() => ps.delete(p)).catch(() => ps.delete(p)) && p),
  wait: (limit: number) => ps.size >= limit && Promise.race(ps),
  all: () => Promise.all(ps),
});
/* eslint-enable */

export const LOGO = String.raw`
    ___                   __          ____  __             
   /   |  _____________  / /______   / __ \/ /   ___  _____
  / /| | / ___/ ___/ _ \/ __/ ___/  / / / / /   / _ \/ ___/
 / ___ |(__  |__  )  __/ /_(__  )  / /_/ / /___/  __/ /    
/_/  |_/____/____/\___/\__/____/  /_____/_____/\___/_/     
`;

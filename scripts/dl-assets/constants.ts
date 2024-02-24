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

export const LOGO = String.raw`
    ___                   __          ____  __             
   /   |  _____________  / /______   / __ \/ /   ___  _____
  / /| | / ___/ ___/ _ \/ __/ ___/  / / / / /   / _ \/ ___/
 / ___ |(__  |__  )  __/ /_(__  )  / /_/ / /___/  __/ /    
/_/  |_/____/____/\___/\__/____/  /_____/_____/\___/_/     
`;

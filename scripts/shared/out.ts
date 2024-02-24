/* eslint-disable no-console */

import { AA } from "./aa";

export const ASCII = {
  BLACK: "\x1b[30m",
  RED: "\x1b[31m",
  GREEN: "\x1b[32m",
  YELLOW: "\x1b[33m",
  BLUE: "\x1b[34m",
  MAGENTA: "\x1b[35m",
  CYAN: "\x1b[36m",
  WHITE: "\x1b[37m",
  GRAY: "\x1b[2m",
  BOLD: "\x1b[1m",
  END: "\x1b[0m",
  GO_UP: "\x1b[1A",
  DEL_LINE: "\x1b[2K",
};

export const out = {
  success: (message: string) => {
    console.log(`${ASCII.GREEN}✓ ${message} ${ASCII.END}`);
  },

  fail: (message: string) => {
    console.log(`${ASCII.RED}× ${message} ${ASCII.END}`);
  },

  info: (message: string) => {
    console.log(
      `\n${ASCII.WHITE}${ASCII.BLUE}i${ASCII.END} ${message} ${ASCII.END}`
    );
  },

  debug: (message: string) => {
    console.log(`${ASCII.GRAY}${message}${ASCII.END}`);
  },

  done: () => {
    const aa = AA[Math.floor(Math.random() * AA.length)];
    console.log(`\n${ASCII.GRAY}--------------------${ASCII.END}`);
    console.log(
      `${ASCII.GREEN}✓ Done! ${ASCII.GRAY}${ASCII.END}\t${aa}${ASCII.END}`
    );
  },
};

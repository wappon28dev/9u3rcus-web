/* eslint-disable no-console */

import path from "path";
import { rmdir } from "node:fs/promises";
import { write } from "bun";
import { out } from "scripts/shared/out";
import { LOGO, type ChildrenFlat, PUBLIC_PATH } from "./constants";

const {
  ASSETS_API_ENDPOINT: endpoint,
  ASSETS_API_REFERER: referer,
  ASSETS_API_ACCESS_TOKEN: accessToken,
} = Bun.env;
const childrenUrl = `${endpoint}?dirPath=/`;

// main
console.log(LOGO);

// assets list
out.info("Fetching assets list...");
const res = await fetch(childrenUrl, {
  headers: {
    referer,
    authorization: `Bearer ${accessToken}`,
  },
});

if (!res.ok) {
  out.fail(`Failed to fetch assets list: ${await res.text()}`);
  throw new Error("Failed to fetch asset list");
}

const assets: ChildrenFlat = await res.json();
out.success(`Fetched ${assets.length} assets`);
assets.forEach(({ filePath, size, lastModifiedDateTime }, i) => {
  out.debug(`  [${i + 1}] - ${filePath}`);
  out.debug(
    `   └ size: ${size} bytes\tlastModified: ${new Date(lastModifiedDateTime).toLocaleString()}`
  );
});

// remove old assets
out.info("Removing old assets...");
await Promise.all([
  rmdir(path.join(PUBLIC_PATH, "assets"), { recursive: true }).catch((err) => {
    out.fail(`Failed to remove old assets: ${err}`);
    throw err;
  }),
]);

// download assets
out.info("Downloading assets...");
await Promise.all(
  assets.map(async ({ filePath, name, downloadUrl }) => {
    const data = await fetch(downloadUrl);

    if (!data.ok) {
      out.fail(`Failed to fetch asset "${filePath}": ${await data.text()}`);
      throw new Error("Failed to fetch asset");
    }

    const fullPathPublic = path.join(PUBLIC_PATH, filePath);
    await write(fullPathPublic, data, {
      createPath: true,
    });
    out.success(`Saved: ${name}`);
  })
);

out.done();

import path from "path";
import { spawn, spawnSync } from "bun";
import { out } from "scripts/shared/out";

const PJ_ROOT = path.join(import.meta.dirname, "..", "..");

const arg = process.argv.slice(2).at(0);
if (arg == null) throw new Error("No arguments provided");

const script = {
  dev: ["bunx astro dev"],
  build: ["bunx astro check", "bunx astro build"],
};

const cmd = script[arg as keyof typeof script];
if (cmd == null) throw new Error(`No script found for ${arg}`);

out.info(`Running ${arg} script`);

out.info("Starting http-server");
const port = Bun.env.ASSETS_LOCAL_SERVER_PORT;
if (port == null) throw new Error("Port not found");
const proc = spawn(["bunx", "http-server", "-p", port], {
  cwd: path.join(PJ_ROOT, "public"),
  onExit(subprocess) {
    subprocess.kill();
    out.success("http-server exited");
  },
});

process.on("SIGINT", () => {
  proc.kill();
  out.success("http-server exited");
  process.exit(0);
});

try {
  // eslint-disable-next-line no-restricted-syntax
  for await (const _cmd of cmd) {
    out.info(`Running \`${_cmd}\``);
    spawnSync(_cmd.split(" "), {
      cwd: PJ_ROOT,
      stdout: "inherit",
    });
  }
} finally {
  proc.kill();
  out.success("http-server exited");
}

out.done();

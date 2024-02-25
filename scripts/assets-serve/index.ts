import path from "path";
import { spawn, spawnSync } from "bun";
import { out } from "scripts/shared/out";

const PJ_ROOT = path.join(import.meta.dirname, "..", "..");

// dispose
out.info("dispose http-server");
spawnSync(["pkill", "-KILL", "-f", "http-server"], {
  stdout: "ignore",
  stderr: "inherit",
});
out.success("http-server disposed");

// serve
out.info("Serving http-server");

const port = Bun.env.ASSETS_LOCAL_SERVER_PORT;
if (port == null) throw new Error("Port not found");

const serveProc = spawn(["bunx", "http-server", "-p", port], {
  cwd: path.join(PJ_ROOT, "public"),
  stderr: "inherit",
  stdout: "inherit",
  onExit(subprocess) {
    subprocess.kill();
    out.fail("http-server exited");
    process.exit(1);
  },
});

process.on("SIGINT", () => {
  serveProc.kill();
  out.fail("http-server exited");
  process.exit(0);
});

await new Promise((resolve) => {
  setTimeout(resolve, 2000);
});

out.success("http-server started");
out.done();

process.exit(0);

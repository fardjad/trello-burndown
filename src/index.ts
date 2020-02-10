import os from "os";
import cluster from "cluster";
import { start } from "./worker";
import { normalizePort } from "./services/utils";
import logger from "./services/logger";

const CPU_COUNT = os.cpus().length;
const HOST = process.env.HOST || "localhost";
const PORT = normalizePort(process.env.PORT, 3000);

if (cluster.isMaster) {
  for (let i = 0; i < CPU_COUNT; i += 1) {
    const worker = cluster.fork();
    worker.on("exit", (code, signal) => {
      if (signal) {
        logger.info(`worker was killed by signal: ${signal}`);
      } else if (code !== 0) {
        logger.error(`worker exited with error code: ${code}`);
      } else {
        logger.info(`Worker started. PID: ${worker.process.pid}`);
      }
    });
  }
} else {
  start(HOST, PORT);
}

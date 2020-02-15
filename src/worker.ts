import app from "./app";
import logger from "./services/logger";
import { isDevelopment } from "./config/node-env";

const enableLongStackTraces = async () => {
  Error.stackTraceLimit = Infinity;
  const longjohn = await import("longjohn");
  longjohn.async_trace_limit = -1;
};

export const start = async (host: string, port: number) => {
  if (isDevelopment()) {
    await enableLongStackTraces();
  }

  app.listen(port, host, () => {
    logger.info(`Server is listening on ${host}:${port}`);
  });
};

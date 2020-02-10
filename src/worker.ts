import app from "./app";
import logger from "./services/logger";

export const start = (host: string, port: number) => {
  app.listen(port, host, () => {
    logger.info(`Server is listening on ${port}:${host}`);
  });
};

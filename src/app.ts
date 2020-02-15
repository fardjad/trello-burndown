import express, { Request, Response, NextFunction } from "express";
import indexRouter from "./api/routes/index";
import trelloRouter from "./api/routes/trello";
import logger from "./services/logger";
import { isProduction } from "./config/node-env";

const app = express();
app.use("/", indexRouter);
app.use("/trello", trelloRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err);
  }

  logger.error(err);

  res.status(500).json({
    message: isProduction() ? err.name : err.toString(),
    stack: isProduction() ? undefined : err.stack
  });
});

export default app;

import express from "express";
import indexRouter from "./routes/index";
import trelloRouter from "./routes/trello";

const app = express();
app.use("/", indexRouter);
app.use("/trello", trelloRouter);

export default app;

import express from "express";
import indexRouter from "./routes/index";
const app = express();
app.use("/", indexRouter);
export default app;

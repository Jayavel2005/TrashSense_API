import express from "express";
import transRouter from "./routes/routes.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";

const app = express();

app.use(transRouter);

app.use(errorMiddleware);

export default app;

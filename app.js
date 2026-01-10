import express from "express";
import transRouter from "./routes/routes.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import path from "path";
import { limiter } from "./middlewares/ratelimit.middleware.js";

const app = express();
app.use(limiter);
app.use(transRouter);
app.use("/model", express.static(path.join(process.cwd(), "model")));
app.use(errorMiddleware);

export default app;

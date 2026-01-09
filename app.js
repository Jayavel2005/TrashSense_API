import express from "express";
import transRouter from "./routes/routes.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import path from "path";

const app = express();

app.use(transRouter);
app.use("/model", express.static(path.join(process.cwd(), "model")));
app.use(errorMiddleware);

export default app;

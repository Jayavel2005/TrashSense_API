import express from "express";
import transRouter from "./routes/routes.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import path from "path";
import { limiter } from "./middlewares/ratelimit.middleware.js";
import { swaggerDocs } from "./config/swagger.js";

const app = express();

app.use(express.json());

// Swagger docs
swaggerDocs(app);

// Rate limit only API routes
app.use("/api/v1", limiter);

// API routes
app.use("/api/v1/trash", transRouter);

// Serve ML model
app.use("/model", express.static(path.join(process.cwd(), "model")));

// Error handler
app.use(errorMiddleware);

export default app;

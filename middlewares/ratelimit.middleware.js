import { rateLimit } from "express-rate-limit";

export const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  limit: 10,
  message: "API rate limit reached.Try again after 1 minutes.",
  statusCode: 429,
});

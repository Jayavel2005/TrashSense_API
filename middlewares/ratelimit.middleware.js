import { rateLimit } from "express-rate-limit";

export const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  limit: 10,
  message: {
    success: false,
    message: "Too many requests. Please try again after a minute.",
  },
  statusCode: 429,
  standardHeaders: true,
  legacyHeaders: false,
});

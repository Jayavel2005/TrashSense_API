import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "TrashSense API",
      version: "1.0.0",
      description:
        "AI-powered API to classify waste images as Recyclable or Non-Recyclable",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },

  apis: [path.join(__dirname, "../routes/*.js")],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export const swaggerDocs = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

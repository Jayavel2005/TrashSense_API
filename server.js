import app from "./app.js";
import { config } from "./config/env.js";

app.listen(config.PORT, () => {
  console.log(`Server is running on http://localhost:${config.PORT}`);
  console.log("Swagger docs available at http://localhost:5000/api-docs");
});

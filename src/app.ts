import express from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerConfig } from "./http/config/swagger";
import { awardsRoutes } from "./http/controllers/awards/routes";
import { errorHandler } from "./middlewares/error-handler";

export const app = express();
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerConfig));
app.use(awardsRoutes);

app.use(errorHandler);

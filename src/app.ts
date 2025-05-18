import express from "express";
import { awardsRoutes } from "./http/controllers/awards/routes";

export const app = express();
app.use(express.json());
app.use(awardsRoutes);

import { Router } from "express";
import { search } from "./search";
import { intervals } from "./intervals";
import { create } from "./create";

export const awardsRoutes = Router();

awardsRoutes.get("/awards/intervals", intervals);
awardsRoutes.get("/awards", search);
awardsRoutes.post("/awards", create);

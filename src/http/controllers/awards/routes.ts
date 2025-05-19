import { Router } from "express";
import { search } from "./search";
import { intervals } from "./intervals";
import { create } from "./create";
import { importAwards } from "./import-awards";
import multer from "multer";

export const uploadDest = "tmp";
const upload = multer({ dest: uploadDest });
export const awardsRoutes = Router();

awardsRoutes.post("/awards/import", upload.single("file"), importAwards);
awardsRoutes.get("/awards/intervals", intervals);
awardsRoutes.get("/awards", search);
awardsRoutes.post("/awards", create);

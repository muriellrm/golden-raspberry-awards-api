import { uploadDest } from "#/lib/prisma";
import { Router } from "express";
import multer from "multer";
import { create } from "./create";
import { importAwards } from "./import-awards";
import { intervals } from "./intervals";
import { search } from "./search";


const upload = multer({ dest: uploadDest });
export const awardsRoutes = Router();

awardsRoutes.post("/awards/import", upload.single("file"), importAwards);
awardsRoutes.get("/awards/intervals", intervals);
awardsRoutes.get("/awards", search);
awardsRoutes.post("/awards", create);

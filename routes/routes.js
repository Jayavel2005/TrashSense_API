import { Router } from "express";
import { analyzeTrash, welcome } from "../controllers/trashSense.controller.js";
import { upload } from "../config/multer.js";
const transRouter = Router();

transRouter.get("/", welcome);

transRouter.post("/analyze", upload.single("trash"), analyzeTrash);

export default transRouter;

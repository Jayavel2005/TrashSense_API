import { Router } from "express";
import { analyzeTrash, welcome } from "../controllers/trashSense.controller.js";
import { upload } from "../config/multer.js";
const transRouter = Router();

/**
 * @swagger
 * /api/v1/trash:
 *   get:
 *     summary: API health check
 *     description: Verifies that TrashSense API is running
 *     tags:
 *       - TrashSense
 *     responses:
 *       200:
 *         description: Server is running
 */

transRouter.get("/", welcome);

/**
 * @swagger
 * /api/v1/trash/analyze:
 *   post:
 *     summary: Analyze waste image
 *     description: Upload an image to classify it as Recyclable or Non-Recyclable
 *     tags:
 *       - TrashSense
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - trash
 *             properties:
 *               trash:
 *                 type: string
 *                 format: binary
 *                 description: Waste image file (JPEG/PNG)
 *     responses:
 *       200:
 *         description: Prediction result
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 result:
 *                   type: object
 *                   properties:
 *                     label:
 *                       type: string
 *                       example: Recyclable
 *                     confidence:
 *                       type: number
 *                       example: 0.98
 *       415:
 *         description: Unsupported file type
 *       429:
 *         description: Too many requests
 */

transRouter.post("/analyze", upload.single("trash"), analyzeTrash);

export default transRouter;

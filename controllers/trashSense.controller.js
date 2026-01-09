import { bufferConverter, predict } from "../services/trash.service.js";
import fs from "fs/promises";

export const welcome = (req, res, next) => {
  res.status(200).json({
    sucess: true,
    message: "Server is running successfully. 🎉",
  });
};

export const analyzeTrash = async (req, res, next) => {
  try {
    if (!req.file) {
      const err = new Error("File not found.");
      err.statusCode = 404;
      throw err;
    }

    const buffer = await bufferConverter(req.file.path);
    const result = await predict(buffer);

    await fs.unlink(req.file.path);

    res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    next(error);
  }
};

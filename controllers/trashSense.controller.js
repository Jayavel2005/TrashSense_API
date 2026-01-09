import { bufferConverter, buffertoTensor } from "../services/trash.service.js";

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
    const bufferToTensor = buffertoTensor();

    res.status(200).json({
      sucess: true,
      message: "trash uploaded successfully.",
    });
  } catch (error) {
    next(error);
  }
};

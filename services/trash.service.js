import fs from "fs/promises";
import * as tf from "@tensorflow/tfjs";
import sharp from "sharp";

const LABELS = ["Recyclable", "Non-Recyclable"];
let model = null;
export const bufferConverter = async (filePath) => {
  return await fs.readFile(filePath);
};

const loadModel = async () => {
  if (!model) {
    try {
      model = await tf.loadLayersModel(
        "http://localhost:5000/model/model.json"
      );
      console.log("✅ TrashSense AI model loaded successfully");
    } catch (err) {
      console.error("❌ Model loading failed:", err.message);
      throw err;
    }
  }
  return model;
};

export const bufferToTensor = async (buffer) => {
  try {
    const { data, info } = await sharp(buffer)
      .resize(224, 224)
      .removeAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    return tf.tidy(() =>
      tf
        .tensor(
          new Uint8Array(data),
          [1, info.height, info.width, info.channels],
          "float32"
        )
        .div(255)
    );
  } catch (err) {
    throw new Error("Invalid image format. Use JPEG or PNG");
  }
};

export const predict = async (buffer) => {
  const modelInstance = await loadModel();
  const inputTensor = await bufferToTensor(buffer);

  const prediction = modelInstance.predict(inputTensor);
  const scores = await prediction.data();

  inputTensor.dispose();
  prediction.dispose();

  const maxScore = Math.max(...scores);
  const index = scores.indexOf(maxScore);

  return {
    prediction: LABELS[index],
    confidence: Number(maxScore.toFixed(3)),
    classes: LABELS,
    scores: scores.map((s) => Number(s.toFixed(3))),
  };
};

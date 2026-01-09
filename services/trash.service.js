import fs from "fs/promises";

export const bufferConverter = async (filePath) => {
  const buffer = await fs.readFile(filePath);

  return buffer;
};

export const buffertoTensor = (buffer) => {};

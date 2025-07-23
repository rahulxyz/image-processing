import { constants, promises as fsPromises } from 'fs';
import sharp from 'sharp';
import path from 'path';

const getResizeImage = async (
  filename: string,
  width: number,
  height: number,
): Promise<string | undefined> => {
  const newFilePath = path.join(
    __dirname,
    `../assets/resized/${filename}-${width}x${height}.jpg`,
  );

  try {
    const existingFile = await getExistingFile(newFilePath);
    if (existingFile) return newFilePath;

    const imagePath = path.join(__dirname, `../assets/full/${filename}.jpg`);

    const data = await fsPromises.readFile(imagePath);
    const resizedImgData = await sharp(data)
      .resize(width, height)
      .jpeg()
      .toBuffer();
    await fsPromises.writeFile(newFilePath, resizedImgData);
    return newFilePath;
  } catch (err) {
    console.error('Error resizing image:', err);
    throw err;
  }
};

const getExistingFile = async (filename: string) => {
  try {
    await fsPromises.access(filename, constants.R_OK | constants.W_OK);
    return filename;
  } catch (err) {
    console.error('Checking if resized file exists:', err);
    return;
  }
};

export { getResizeImage };

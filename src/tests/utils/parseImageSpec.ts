import { getResizeImage } from '../../utils/parseImage';
import path from 'path';
import { promises as fsPromises } from 'fs';

describe('getResizeImage', () => {
  const testFilename = 'fjord';
  const width = 100;
  const height = 100;
  const resizedPath = path.join(
    __dirname,
    `../../assets/resized/${testFilename}-${width}x${height}.jpg`,
  );

  afterAll(async () => {
    try {
      await fsPromises.unlink(resizedPath);
    } catch (err) {
      console.error("Failed to delete resized file:", err);
    }
  });

  it('should resize an image and return the new file path', async () => {
    const result = await getResizeImage(testFilename, width, height);
    expect(result).toBe(resizedPath);

    // Check if file exists
    const fileExists = await fsPromises
      .access(resizedPath)
      .then(() => true)
      .catch(() => false);
    expect(fileExists).toBeTrue();
  });

  it('should throw an error if the source image does not exist', async () => {
    await expectAsync(
      getResizeImage('nonexistent', width, height),
    ).toBeRejected();
  });
});

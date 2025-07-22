import express from "express";
import { getResizeImage } from "../../utils/parseImage";

const api = express.Router();

type FileError = NodeJS.ErrnoException;
api.get("/image", async (req: express.Request, res: express.Response) => {
  const { filename, width, height } = req.query;
  if (!filename || !width || !height)
    return res.status(400).json({
      error: "Missing required query parameters: filename, width, height",
    });

  if (isNaN(Number(width))) {
    return res.status(400).json({ error: "width must be a valid number" });
  }

  if (isNaN(Number(height))) {
    return res.status(400).json({ error: "height must be a valid number" });
  }

  try {
    const newFilePath = await getResizeImage(
      filename as string,
      Number(width),
      Number(height)
    );
    if (!newFilePath)
      return res.status(500).json({ error: "Failed to resize image" });
    res.status(200).sendFile(newFilePath);
  } catch (err: unknown) {
    console.error("Error fetching resized image:", err);
    if(err instanceof Error){
            return res
      .status(500)
      .json({ error: err.message });
    }
    return res
      .status(500)
      .json({ error: "Internal Server Error" });
  }
});

export default api;

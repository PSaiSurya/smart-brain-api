import Clarifai from "clarifai";
import fetch from "node-fetch";

const app = new Clarifai.App({
  apiKey: process.env.APIKEY, //Your API key
});

const apiCall = async (req, res) => {
  try {
    const link = req.body.input.toString();
      const response = await fetch(link);
      const data = await response.headers.get("Content-Type");
      const isImage =
        data === "image/tiff" ||
        data === "image/gif" ||
        data === "image/png" ||
        data === "image/jpeg" ||
        data === "image/bmp" ||
        data === "image/webp";
      if (isImage) {
        const prediction = await app.models.predict(
          {
            id: "f76196b43bbd45c99b4f3cd8e8b40a8a",
            version: "6dc7e46bc9124c5c8824be4822abe105",
          },
          link
        );
        res.status(200).send(prediction);
      } else {
        res.status(400).json("Invalid link. Please try again");
      }
  } catch (error) {
    res.status(400).json("Unable to work with API");
  }
};

const image = async (req, res, database) => {
  const { id } = req.body;
  try {
    const entries = await database("users")
      .where("id", "=", id)
      .increment("entries", 1)
      .returning("entries");
    if (entries.length > 0) {
      res.json(entries[0]);
    } else {
      res.status(400).json("User not found");
    }
  } catch (error) {
    res.status(400).json("Something went wrong");
  }
};

export { image, apiCall };

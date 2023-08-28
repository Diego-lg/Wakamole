import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import axios from "axios";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

function myMiddleware(req, res, next) {
  const apiUrl = "https://gifted-wildflower-54265.pktriot.net/generate"; // Update with the correct API URL
  const stringToSend = "Samoyed dog"; // Replace with your actual string
  console.log("stringToSend:", stringToSend);
  // Make a request to the API endpoint
  axios
    .post(apiUrl, { input: stringToSend }) // Update the payload key to match your Flask code
    .then((response) => {
      // Handle the API response
      console.log("API response:", response.data);

      next();
    })
    .catch((error) => {
      // Handle any errors
      console.error("API error:", error);
      next(error);
    });
}

// Use the middleware function
app.use(myMiddleware);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Test done" });
});

app.listen(8080, () => {
  console.log("Server has started on port 8080");
});

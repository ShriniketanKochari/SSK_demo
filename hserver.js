const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

const FILE_PATH = path.join(__dirname, "codepad.txt");

app.post("/save", (req, res) => {
  const content = req.body.content;

  fs.writeFile(FILE_PATH, content, "utf8", err => {
    if (err) {
      return res.status(500).send("Error saving file");
    }
    res.send("Saved successfully in codepad.txt");
  });
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});

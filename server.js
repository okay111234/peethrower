const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.text({ type: "*/*" }));

app.post("/update", (req, res) => {
  const htmlContent = req.body;

  if (!htmlContent || typeof htmlContent !== "string") {
    return res.status(400).send("Invalid content");
  }

  fs.writeFile(path.join(__dirname, "index.html"), htmlContent, (err) => {
    if (err) {
      console.error("❌ Failed to write index.html:", err);
      return res.status(500).send("Failed to update index.html");
    }

    console.log("✅ index.html updated");
    res.send("index.html updated");
  });
});

app.use(express.static(__dirname));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

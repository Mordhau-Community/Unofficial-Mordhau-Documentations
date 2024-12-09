const express = require("express");
const path = require("path");

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.redirect("/docs/");
});

app.use("/docs/", express.static(path.join(__dirname, "docs/.vitepress/dist")));

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

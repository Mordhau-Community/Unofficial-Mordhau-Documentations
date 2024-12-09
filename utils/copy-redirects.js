const fs = require("fs-extra");
const path = require("path");

const source = path.resolve(__dirname, "../docs/_redirects");
const destination = path.resolve(__dirname, "../.vitepress/dist/_redirects");

fs.copySync(source, destination, { overwrite: true });

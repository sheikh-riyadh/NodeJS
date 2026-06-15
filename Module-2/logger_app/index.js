const fs = require("node:fs")
const path = require("node:path")

const text = process.argv.slice(2).join(" ");
const timestamp = new Date().toISOString()
const message = `${text} ${timestamp} \n`
const destination = path.join(__dirname, 'log.txt')

if (!message) {
  console.log("Please provide message");
  process.exit(1);
}

fs.appendFile(destination, message, { encoding: "utf-8" }, () => {
  console.log("Text append successfully");
});

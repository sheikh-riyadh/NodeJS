import fs from "node:fs";

// Synchronouse file system
const text = "Learning node js file system";

fs.writeFileSync("./fs_write.txt", text, "utf-8");

const data = fs.readFileSync("./fs_read.txt", { encoding: "utf-8" });
console.log(data);

// Asynchonouse

const text2 = "Learning Asynchronouse";

fs.writeFile("./fs_write.txt", text2, { encoding: "utf-8" }, (error) => {
  if (error) {
    return Error("Something went wrong write file");
  }
});

fs.readFile("./fs_read.txt.txt", { encoding: "utf-8" }, (error, data) => {
  if (error) return Error("Something went wrong read file");
  console.log(data);
});

console.log("Hi there");

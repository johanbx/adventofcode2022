const commands = require("fs")
  .readFileSync("./7/input.txt")
  .toString()
  .split("$")
  .map((o) => o.trim())
  .filter(Boolean);

let lvl = 0;
let dir = ["root"];
let files = new Set();
let dirs = new Set();

for (const command of commands) {
  const parts = command.split("\n");
  const input = parts[0];
  const output = parts.slice(1, parts.length);

  if (input === "cd /") {
    lvl = 0;
    dir = ["root"];
  } else if (input === "cd ..") {
    lvl = lvl - 1;
    dir.pop();
  } else if (input.startsWith("cd")) {
    lvl = lvl + 1;
    dir.push(input.split(" ")[1]);
  } else if (input === "ls") {
    for (const fileOrDir of output) {
      const dirKey = dir.join("/");
      dirs.add(dirKey);
      const [sizeOrDir, fileOrDirName] = fileOrDir.split(" ");

      if (sizeOrDir === "dir") continue;

      const fileKey = `${sizeOrDir} ${dirKey} ${fileOrDirName}`;

      files.add(fileKey);
    }
  }
}

files = Array.from(files);
dirs = Array.from(dirs);

const sizeTreshhold = 100000;
const diskSize = 70000000;
const updateSize = 30000000;
let totalSizeUnderTreshhold = 0;

const totalSize = files.reduce((acc, curr) => {
  const [size] = curr.split(" ");
  return acc + Number(size);
}, 0);
const spaceNeeded = totalSize + updateSize - diskSize;
const dirsWithSizes = [];

for (const dir of dirs) {
  const dirSize = files.reduce((acc, curr) => {
    const [size, path] = curr.split(" ");

    if (!path.startsWith(dir)) {
      return acc;
    }

    return acc + Number(size);
  }, 0);

  dirsWithSizes.push([dirSize, dir]);

  if (dirSize <= sizeTreshhold) {
    totalSizeUnderTreshhold += dirSize;
  }
}

const sortedDirsWithSizes = dirsWithSizes.sort((a, b) =>
  a[0] < b[0] ? -1 : 1
);
let totalSizeOfDirToBeDeleted = 0;

for (const dir of sortedDirsWithSizes) {
  if (dir[0] >= spaceNeeded) {
    totalSizeOfDirToBeDeleted = dir[0];
    break;
  }
}

console.log({ totalSizeUnderTreshhold, totalSizeOfDirToBeDeleted });

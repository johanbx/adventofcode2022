const rows = require("fs").readFileSync("./5/input.txt").toString();

const [stackRows, instructions] = rows.split("\n\n").map((o) => o.split("\n"));

const stackCount = Number(stackRows.pop().slice(-2).trim());

const stacks = [];
const stacks2 = [];

for (const stackRow of stackRows) {
  for (let i = 0; i < stackCount; i++) {
    const part = stackRow.slice(i * 4, i * 4 + 4).trim();
    if (!part) {
      continue;
    }
    if (!stacks[i]) {
      stacks[i] = [part];
      stacks2[i] = [part];
    } else {
      stacks[i].push(part);
      stacks2[i].push(part);
    }
  }
}

for (const instruction of instructions) {
  const [, amount, , stackFrom, , stackTo] = instruction.split(" ").map(Number);
  for (let i = 0; i < amount; i++) {
    stacks[stackTo - 1].unshift(stacks[stackFrom - 1].shift());
  }
  const moveThis = stacks2[stackFrom - 1].slice(0, amount);
  const oldVals = stacks2[stackTo - 1];

  stacks2[stackFrom - 1] = stacks2[stackFrom - 1].slice(amount);
  stacks2[stackTo - 1] = [...moveThis, ...oldVals];
}

const tops = stacks.map((o) => o[0].slice(1, 2)).join("");
const tops2 = stacks2.map((o) => o[0].slice(1, 2)).join("");

console.log({ tops, tops2 });

const puzzleData = require("fs").readFileSync("1/input.txt").toString();

const elfCalories = puzzleData
  .split("\n\n")
  .map((o) => o.split("\n").reduce((acc, curr) => acc + Number(curr), 0));

const sortedElfCalories = elfCalories.sort((a, b) => (a < b ? 1 : -1));

const topCalories = sortedElfCalories[0];
const top3CaloriesSum = sortedElfCalories
  .slice(0, 3)
  .reduce((acc, curr) => acc + curr);

console.log({
  topCalories,
  top3CaloriesSum,
});

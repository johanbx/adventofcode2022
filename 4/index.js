const rows = require("fs").readFileSync("./4/input.txt").toString().split("\n");

let containsOther = 0;
let overlaps = 0;

for (const row of rows) {
  const [[elf1From, elf1To], [elf2From, elf2To]] = row
    .split(",")
    .map((o) => o.split("-").map(Number));

  if (
    (elf1From >= elf2From && elf1To <= elf2To) ||
    (elf2From >= elf1From && elf2To <= elf1To)
  ) {
    containsOther += 1;
  }

  if (
    (elf1From >= elf2From && elf1From <= elf2To) ||
    (elf1To >= elf2From && elf1To <= elf2From) ||
    (elf2From >= elf1From && elf2From <= elf1To) ||
    (elf2To >= elf1From && elf2To <= elf1From)
  ) {
    overlaps += 1;
  }
}

console.log({ containsOther, overlaps });

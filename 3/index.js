const rows = require("fs").readFileSync("./3/input.txt").toString().split("\n");

let score = 0;
let score2 = 0;
let buffer = [];

const getScore = (str) => {
  const charCode = str.charCodeAt(0);
  if (charCode <= 122 && charCode >= 97) {
    return charCode - 96;
  } else {
    return charCode - 64 + 26;
  }
};

for (const row of rows) {
  buffer.push(row);

  // part 2
  if (buffer.length === 3) {
    // sort by length
    const [first, second, third] = buffer.sort((a,b) => a.length < b.length);
    let secondMatches = new Set();
    let allMatches = new Set();
    for (let i = 0; i < first.length; i++) {
      for (let j = 0; j < second.length; j++) {
        if (first[i] === second[j]) {
          secondMatches.add(first[i]);
        }
      }
    }

    secondMatches = Array.from(secondMatches);

    for (let i = 0; i < secondMatches.length; i++) {
      for (let j = 0; j < third.length; j++) {
        if (secondMatches[i] === third[j]) {
          allMatches.add(secondMatches[i])
        }
      } 
    }

    allMatches = Array.from(allMatches);
    if (allMatches.length > 1) {
      console.error('WARNING MORE THAN ONE LIKE THIS');
    }
    score2 += getScore(allMatches[0]);

    buffer= [];
  }

  const loops = row.length / 2;
  const dups = new Set();
  for (let i = 0; i < loops; i++) {
    for (let j = loops; j < row.length; j++) {
      if (row[i] === row[j]) {
        dups.add(row[i]);
      }
    }
  }
  dups.forEach((item) => {
    score += getScore(item);
  });
}

console.log({ score, score2 });

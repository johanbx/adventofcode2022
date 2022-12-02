const rows = require("fs").readFileSync("./2/input.txt").toString().split("\n");

let totalScore = 0;
let totalScore2 = 0;

/** 
 * A = Rock
 * B = Paper
 * C = Scissors
 * 
 * X = Rock / Lose
 * Y = Paper / Draw
 * Z = Scissors / Win
*/

for (const line of rows) {
  const [opponent, us] = line.split(" ");
  switch (us) {
    case "X": // Lose
      totalScore += 1;
      if (opponent === "A") {
        totalScore += 3;
        totalScore2 += 3 // We pick scissors
      } 
      else if (opponent === 'B') {
        totalScore2 += 1; // we pick rock
      }
      else if (opponent === "C") {
        totalScore += 6;
        totalScore2 += 2; // We pick paper
      }

      break;
    case "Y": // Draw
      totalScore += 2;
      totalScore2 += 3;
      if (opponent === "A") {
        totalScore += 6;
        totalScore2 += 1; // We pick rock
      } else if (opponent === "B") {
        totalScore += 3;
        totalScore2 += 2; // We pick paper
      } else if (opponent === 'C') {
        totalScore2 += 3 // We pick scissors
      }
      break;
    case "Z": // Win
      totalScore += 3;
      totalScore2 += 6;
      if (opponent === 'A') {
        totalScore2 += 2; // We pick paper
      }
      else if (opponent === "B") {
        totalScore += 6;
        totalScore2 += 3; // We pick scissors
      } else if (opponent === "C") {
        totalScore += 3;
        totalScore2 += 1; // We pick rock
      }
  }
}

console.log({ totalScore, totalScore2 });

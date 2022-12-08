const rows = require("fs").readFileSync("./8/input.txt").toString().split("\n");

const width = rows[0].length;
const height = rows.length;

const lookAround = (x, y) => {
  const thisTree = rows[y][x];

  const visibleDirections = {
    right: true,
    left: true,
    top: true,
    bottom: true,
  };

  const visibleTrees = {
    right: 0,
    left: 0,
    top: 0,
    bottom: 0,
  };

  // Look right
  for (let i = x + 1; i < width; i++) {
    const tree = rows[y][i];

    visibleTrees.right++;

    if (tree >= thisTree) {
      visibleDirections.right = false;
      break;
    }
  }

  // Look left
  for (let i = x - 1; i >= 0; i--) {
    const tree = rows[y][i];
    visibleTrees.left++;
    if (tree >= thisTree) {
      visibleDirections.left = false;
      break;
    }
  }

  // Look top
  for (let i = y - 1; i >= 0; i--) {
    const tree = rows[i][x];
    visibleTrees.top++;
    if (tree >= thisTree) {
      visibleDirections.top = false;
      break;
    }
  }

  // Look bottom
  for (let i = y + 1; i < height; i++) {
    const tree = rows[i][x];
    visibleTrees.bottom++;
    if (tree >= thisTree) {
      visibleDirections.bottom = false;
      break;
    }
  }

  const sienceScore =
    visibleTrees.right *
    visibleTrees.left *
    visibleTrees.bottom *
    visibleTrees.top;

  const visible =
    visibleDirections.right ||
    visibleDirections.left ||
    visibleDirections.top ||
    visibleDirections.bottom;

  return [visible, sienceScore];
};

const edgeTrees = height * 2 + (width - 2) * 2;

let visibleTrees = edgeTrees;
let highestScienceScore = 0;
for (let y = 1; y < height - 1; y++) {
  for (let x = 1; x < width - 1; x++) {
    const [visible, scienceScore] = lookAround(x, y);
    if (visible) {
      visibleTrees++;
    }
    if (scienceScore > highestScienceScore) {
      highestScienceScore = scienceScore;
    }
  }
}

console.log({ visibleTrees, highestScienceScore });

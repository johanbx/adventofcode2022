const stream = require("fs").readFileSync("./6/input.txt").toString();

const uniquePartsTreshholdStartTransmit = 4;
const uniquePartsTreshholdStartMessage = 14;

let startTransmit = false;

let startPoint = NaN;
let startMessagePoint = NaN;

for (let i = 0; i < stream.length; i++) {
  const startParts = stream.slice(i, i + uniquePartsTreshholdStartTransmit);
  const uniqueStartTransmitParts = new Set(startParts);
  const uniqueStartTransmitPartsLength = Array.from(
    uniqueStartTransmitParts
  ).length;

  const messageStartParts = stream.slice(
    i,
    i + uniquePartsTreshholdStartMessage
  );
  const uniqueMessageStartTransmitParts = new Set(messageStartParts);
  const uniqueMessageStartTransmitPartsLength = Array.from(
    uniqueMessageStartTransmitParts
  ).length;

  startTransmit =
    uniqueStartTransmitPartsLength === uniquePartsTreshholdStartTransmit;
  startOfMessage =
    uniqueMessageStartTransmitPartsLength === uniquePartsTreshholdStartMessage;

  if (!startPoint && startTransmit) {
    startPoint = i + uniqueStartTransmitPartsLength;
  }

  if (!startMessagePoint && startOfMessage) {
    startMessagePoint = i + uniqueMessageStartTransmitPartsLength;
  }

  if (startPoint && startMessagePoint) {
    break;
  }
}

console.log({ startPoint, startMessagePoint });

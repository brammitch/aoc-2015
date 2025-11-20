export function updateCoordinates(
  coordinates: [number, number],
  value: string
) {
  switch (value) {
    // Move north - increment Y-axis
    case "^":
      coordinates[1]++;
      break;
    // Move east - increment X-axis
    case ">":
      coordinates[0]++;
      break;
    // Move south - decrement Y-axis
    case "v":
      coordinates[1]--;
      break;
    // Move west - decrement X-axis
    case "<":
      coordinates[0]--;
      break;
    default:
      break;
  }
}

export async function getNumberOfHousesSantaVisited(
  input: string
): Promise<number> {
  const coordinates: [number, number] = [0, 0];
  const visitedHouses = new Set<string>(["0, 0"]);

  [...input].forEach((value) => {
    updateCoordinates(coordinates, value);
    visitedHouses.add(`${coordinates[0]}, ${coordinates[1]}`);
  });

  return visitedHouses.size;
}

export async function getNumberOfHousesSantaAndRoboSantaVisited(
  input: string
): Promise<number> {
  const santaCoordinates: [number, number] = [0, 0];
  const robotCoordinates: [number, number] = [0, 0];
  const visitedHouses = new Set<string>(["0, 0"]);

  [...input].forEach((value, i) => {
    // Santa and Robo-Santa take turns moving; Santa goes first.
    if (i % 2) {
      updateCoordinates(robotCoordinates, value);
      visitedHouses.add(`${robotCoordinates[0]}, ${robotCoordinates[1]}`);
    } else {
      updateCoordinates(santaCoordinates, value);
      visitedHouses.add(`${santaCoordinates[0]}, ${santaCoordinates[1]}`);
    }
  });

  return visitedHouses.size;
}

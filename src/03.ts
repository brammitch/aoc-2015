import fs from "node:fs/promises";

export async function getNumberOfHousesVisited(input: string): Promise<number> {
  const coordinates: [number, number] = [0, 0];
  const visitedHouses = new Set<string>();

  console.log(input.length);

  [...input].forEach((value) => {
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
    visitedHouses.add(`${coordinates[0]}, ${coordinates[1]}`);
  });

  return visitedHouses.size;
}

const input = await fs.readFile("./src/input/03.txt", "utf-8");
const numberOfHousesVisited = await getNumberOfHousesVisited(input);

console.log(numberOfHousesVisited);

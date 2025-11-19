import fs from "node:fs/promises";

export async function getFloors(): Promise<{
  floor: number;
  position: number;
}> {
  const input = await fs.readFile("./src/input/01.txt", "utf-8");

  let floor = 0;
  let basementEntered = false;
  let position = 0;

  [...input].forEach((value, index) => {
    switch (value) {
      case "(":
        floor++;
        break;
      case ")":
        floor--;
        break;
      default:
        break;
    }

    if (floor < 0 && !basementEntered) {
      position = index + 1;
      basementEntered = true;
    }
  });

  return { floor, position };
}

const { floor, position } = await getFloors();

console.log("Basement entered at position:", position);
console.log("Final floor:", floor);

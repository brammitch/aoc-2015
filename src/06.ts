import { open } from "node:fs/promises";
// See https://github.com/RaghavCodeHub/matrix/blob/master/lib/index.js
import matrix from "matrix-js";

type Instruction = "off" | "on" | "toggle";
type Matrix = any;

export function generateGrid(x: number, y: number): Matrix {
  // https://github.com/RaghavCodeHub/matrix?tab=readme-ov-file#19-generate
  const M = matrix.gen(0).size(x, y);

  return matrix(M);
}

/**
 *
 * @param M Matrix
 * @param x1 starting X position
 * @param y1 starting Y position
 * @param x2 ending X position
 * @param y2 ending Y position
 * @param instruction "on" | "off" | "toggle"
 * @returns A Matrix with all values in the given (x1, y1), (x2, y2) area toggled from zero to one, or one to zero
 */
export function updateMatrix(
  M: Matrix,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  instruction: Instruction
) {
  // @ts-ignore
  const result = M.map((v, p) => {
    // Update the value according to the instruction if the
    // position is between the coordinate pairs (inclusive)
    if (p[0] >= x1 && p[0] <= x2 && p[1] >= y1 && p[1] <= y2) {
      if (instruction === "off") return 0;
      if (instruction === "on") return 1;
      return !v ? 1 : 0; // instruction === "toggle"
    }
    return v;
  });

  return matrix(result);
}

/**
 *
 * @param M Matrix
 * @param line instruction set in one of the three following formats: A) turn off x1,y1 through x2,y2; B) turn on x1,y1 through x2,y2; C) toggle x1,y1 through x2,y2
 * @param useBrightness use the new 'brightness' instructions
 * @returns Matrix
 */
export function processInstruction(
  M: Matrix,
  line: string,
  useBrightness = false
): Matrix {
  let instruction: Instruction = "toggle";
  let x1 = 0;
  let y1 = 0;
  let x2 = 0;
  let y2 = 0;

  const instructionSet = line.split(" ");

  // line with 4 parts are toggle instructions
  if (instructionSet.length === 4) {
    [x1, y1] = (instructionSet[1] as string)
      .split(",")
      .map((v) => parseInt(v)) as unknown as [number, number];
    [x2, y2] = (instructionSet[3] as string)
      .split(",")
      .map((v) => parseInt(v)) as unknown as [number, number];
    instruction = "toggle";
  }

  // lines with 5 parts are on/off instructions
  if (instructionSet.length === 5) {
    [x1, y1] = (instructionSet[2] as string)
      .split(",")
      .map((v) => parseInt(v)) as unknown as [number, number];
    [x2, y2] = (instructionSet[4] as string)
      .split(",")
      .map((v) => parseInt(v)) as unknown as [number, number];
    instruction = instructionSet[1] as Instruction;
  }

  M = useBrightness
    ? updateBrightness(M, x1, y1, x2, y2, instruction)
    : updateMatrix(M, x1, y1, x2, y2, instruction);

  return M;
}

export function countLightsTurnedOn(M: Matrix): number {
  let count = 0;

  // @ts-ignore
  M.map((v) => {
    count += v;
  });

  return count;
}

export async function getNumberOfLightsLit(): Promise<number> {
  let M = generateGrid(1000, 1000);

  const file = await open("./src/input/06.txt");
  for await (const line of file.readLines()) {
    M = processInstruction(M, line);
  }

  return countLightsTurnedOn(M);
}

// Part 2
/**
 *
 * @param M Matrix
 * @param x1 starting X position
 * @param y1 starting Y position
 * @param x2 ending X position
 * @param y2 ending Y position
 * @param instruction "on" | "off" | "toggle"
 * @returns A Matrix with all values in the given (x1, y1), (x2, y2) area toggled from zero to one, or one to zero
 */
export function updateBrightness(
  M: Matrix,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  instruction: Instruction
) {
  // @ts-ignore
  const result = M.map((v, p) => {
    // Update the value according to the instruction if the
    // position is between the coordinate pairs (inclusive)
    if (p[0] >= x1 && p[0] <= x2 && p[1] >= y1 && p[1] <= y2) {
      if (instruction === "off") return Math.max(0, v - 1);
      if (instruction === "on") return v + 1;
      return v + 2; // instruction === "toggle"
    }
    return v;
  });

  return matrix(result);
}

export async function getBrightnessOfLights(): Promise<number> {
  let M = generateGrid(1000, 1000);

  const file = await open("./src/input/06.txt");
  for await (const line of file.readLines()) {
    M = processInstruction(M, line, true);
  }

  return countLightsTurnedOn(M);
}

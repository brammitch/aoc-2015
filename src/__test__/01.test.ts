import assert from "node:assert";
import fs from "node:fs/promises";
import { describe, it } from "node:test";
import { getFloors } from "../01.js";

describe("getFloors", () => {
  it("returns zero", async () => {
    const inputA = "(())";
    const inputB = "()()";
    const resultA = await getFloors(inputA);
    const resultB = await getFloors(inputB);

    assert.equal(resultA.floor, 0);
    assert.equal(resultB.floor, 0);
  });

  it("returns positive numbers (upper levels)", async () => {
    const inputA = "(((";
    const inputB = "(()(()(";
    const inputC = "))(((((";
    const resultA = await getFloors(inputA);
    const resultB = await getFloors(inputB);
    const resultC = await getFloors(inputC);

    assert.equal(resultA.floor, 3);
    assert.equal(resultB.floor, 3);
    assert.equal(resultC.floor, 3);
  });

  it("returns negative numbers (basement levels)", async () => {
    const inputA = "())";
    const inputB = "))(";
    const inputC = ")))";
    const inputD = ")())())";
    const resultA = await getFloors(inputA);
    const resultB = await getFloors(inputB);
    const resultC = await getFloors(inputC);
    const resultD = await getFloors(inputD);

    assert.equal(resultA.floor, -1);
    assert.equal(resultB.floor, -1);
    assert.equal(resultC.floor, -3);
    assert.equal(resultD.floor, -3);
  });

  it("returns the final floor and the position at which the basement was first entered", async () => {
    const input = await fs.readFile("./src/input/01.txt", "utf-8");
    const { floor, position } = await getFloors(input);

    assert.equal(floor, 74);
    assert.equal(position, 1795);
  });
});

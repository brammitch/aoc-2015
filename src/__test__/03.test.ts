import assert from "node:assert";
import fs from "node:fs/promises";
import { describe, it } from "node:test";
import {
  getNumberOfHousesSantaAndRoboSantaVisited,
  getNumberOfHousesSantaVisited,
  updateCoordinates,
} from "../03.js";

describe("updateCoordinates", () => {
  it("updates the array in place", () => {
    const arr: [number, number] = [0, 0];
    updateCoordinates(arr, "^");

    assert.equal(arr[0], 0);
    assert.equal(arr[1], 1);
  });
});

describe("getNumberOfHousesSantaVisited", () => {
  it("counts the initial house", async () => {
    const count = await getNumberOfHousesSantaVisited(">");

    assert.equal(count, 2);
  });

  it("works with a square pattern", async () => {
    const count = await getNumberOfHousesSantaVisited("^>v<");

    assert.equal(count, 4);
  });

  it("works with a repeating pattern", async () => {
    const count = await getNumberOfHousesSantaVisited("^v^v^v^v^v");

    assert.equal(count, 2);
  });

  it("returns the correct answer for the problem", async () => {
    const input = await fs.readFile("./src/input/03.txt", "utf-8");
    const count = await getNumberOfHousesSantaVisited(input);

    assert.equal(count, 2565);
  });
});

describe("getNumberOfHousesSantaAndRoboSantaVisited", () => {
  it("counts the initial house", async () => {
    const count = await getNumberOfHousesSantaAndRoboSantaVisited("^v");

    assert.equal(count, 3);
  });

  it("works with a square pattern", async () => {
    const count = await getNumberOfHousesSantaAndRoboSantaVisited("^>v<");

    assert.equal(count, 3);
  });

  it("works with a repeating pattern", async () => {
    const count = await getNumberOfHousesSantaAndRoboSantaVisited("^v^v^v^v^v");

    assert.equal(count, 11);
  });
});

import assert from "node:assert";
import fs from "node:fs/promises";
import { describe, it } from "node:test";
import { getNumberOfHousesVisited } from "../03.js";

describe("getNumberOfHousesVisited", () => {
  it("counts the initial house", async () => {
    const count = await getNumberOfHousesVisited(">");
    assert.equal(count, 1);
  });

  it("works with a square pattern", async () => {
    const count = await getNumberOfHousesVisited("^>v<");
    assert.equal(count, 4);
  });

  it("works with a repeating pattern", async () => {
    const count = await getNumberOfHousesVisited("^v^v^v^v^v");
    assert.equal(count, 2);
  });

  it("returns the correct answer for the problem", async () => {
    const input = await fs.readFile("./src/input/03.txt", "utf-8");
    const count = await getNumberOfHousesVisited(input);
    assert.equal(count, 2565);
  });
});

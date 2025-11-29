import { describe, it } from "node:test";
import {
  findMatchingAuntPartOne,
  findMatchingAuntPartTwo,
  parseAunts,
} from "../16.js";
import assert from "node:assert";

describe("findMatchingAuntPartOne", () => {
  it("returns the Aunt Sue for part one", async () => {
    const aunts = await parseAunts("./src/input/16.txt");
    const matchingAunt = findMatchingAuntPartOne(aunts);

    assert.strictEqual(matchingAunt, 213);
  });
});

describe("findMatchingAuntPartTwo", () => {
  it("returns the Aunt Sue for part two", async () => {
    const aunts = await parseAunts("./src/input/16.txt");
    const matchingAunt = findMatchingAuntPartTwo(aunts);

    assert.strictEqual(matchingAunt, 323);
  });
});

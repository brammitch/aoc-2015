import { describe, it } from "node:test";
import {
  getFastestReindeerDistance,
  Reindeer,
  reindeerParser,
  reindeerRaceForPoints,
} from "../14.js";
import assert from "node:assert";

describe("getFastestReindeerDistance", () => {
  it("passes the example for part one", async () => {
    const distance = await getFastestReindeerDistance(
      "./src/input/14.test.txt",
      1000
    );
    assert.strictEqual(distance, 1120);
  });

  it("passes part one", async () => {
    const distance = await getFastestReindeerDistance(
      "./src/input/14.txt",
      2503
    );
    assert.strictEqual(distance, 2655);
  });
});

describe("reindeerRaceForPoints", () => {
  it("passes the example for part two", async () => {
    const highScore = await reindeerRaceForPoints(
      "./src/input/14.test.txt",
      1000
    );
    assert.strictEqual(highScore, 689);
  });

  it("passes part two", async () => {
    const highScore = await reindeerRaceForPoints("./src/input/14.txt", 2503);
    assert.strictEqual(highScore, 1059);
  });
});

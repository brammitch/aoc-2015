import { describe, it } from "node:test";
import { getOptimalHappiness, parseSeatingList } from "../13.js";
import assert from "node:assert";

describe("parseSeatingList", () => {
  it("parses the sample dataset correctly", async () => {
    const seatMap = await parseSeatingList("./src/input/13.test.txt");

    assert.strictEqual(seatMap.get("Alice")?.["Bob"], 54);
    assert.strictEqual(seatMap.get("Alice")?.["Carol"], -79);
    assert.strictEqual(seatMap.get("Bob")?.["Alice"], 83);
    assert.strictEqual(seatMap.get("Bob")?.["Carol"], -7);
    assert.strictEqual(seatMap.get("Carol")?.["Alice"], -62);
    assert.strictEqual(seatMap.get("Carol")?.["Bob"], 60);
    assert.strictEqual(seatMap.get("David")?.["Alice"], 46);
    assert.strictEqual(seatMap.get("David")?.["Bob"], -7);
  });
});

describe("getOptimalHappiness", () => {
  it("returns 330 for the sample dataset", async () => {
    const seatMap = await parseSeatingList("./src/input/13.test.txt");
    assert.strictEqual(getOptimalHappiness(seatMap), 330);
  });

  it("returns the correct answer for part one", async () => {
    const seatMap = await parseSeatingList("./src/input/13.txt");
    assert.strictEqual(getOptimalHappiness(seatMap), 618);
  });

  it("calculates happiness when I'm seated at the table, too", async () => {
    const seatMap = await parseSeatingList("./src/input/13.txt");
    assert.strictEqual(getOptimalHappiness(seatMap, true), 601);
  });
});

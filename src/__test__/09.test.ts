import assert from "node:assert";
import { describe, it } from "node:test";
import { findRequestedRoutes } from "../09.js";

describe("get the distance with the test data", () => {
  it("returns 982 for the longest and 605 for the shortest", async () => {
    const { longest, shortest } = await findRequestedRoutes(
      "./src/input/09.test.txt"
    );

    assert.equal(longest, 982);
    assert.equal(shortest, 605);
  });
});

describe("get the shortest distance with the puzzle input", () => {
  it("returns 736 for the longest and 141 for the shortest", async () => {
    const { longest, shortest } = await findRequestedRoutes(
      "./src/input/09.txt"
    );

    assert.equal(longest, 736);
    assert.equal(shortest, 141);
  });
});

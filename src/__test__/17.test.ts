import { describe, it } from "node:test";
import { getCombinations } from "../17.js";
import assert from "node:assert";

describe("getCombinations", () => {
  it("returns the correct number of matches and the number of minimums", async () => {
    const [
      combinations,
      minNumberOfContainers,
      numberOfCombinationsMatchingMinimumNumberOfContainers,
    ] = await getCombinations();

    assert.strictEqual(combinations, 4_372);
    assert.strictEqual(minNumberOfContainers, 4);
    assert.strictEqual(
      numberOfCombinationsMatchingMinimumNumberOfContainers,
      4
    );
  });
});

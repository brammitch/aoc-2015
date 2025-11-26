import assert from "node:assert";
import { describe, it } from "node:test";
import { importData, sumJsonNumbers } from "../12.js";

describe("sumJsonNumbers", () => {
  it("returns the sum of an array", () => {
    assert.strictEqual(sumJsonNumbers([1, 2, 3]), 6);
    assert.strictEqual(sumJsonNumbers([[[3]]]), 3);
    assert.strictEqual(sumJsonNumbers([]), 0);
  });

  it("returns the sum of an object", () => {
    assert.strictEqual(sumJsonNumbers({ a: 2, b: 4 }), 6);
    assert.strictEqual(sumJsonNumbers({ a: { b: 4 }, c: -1 }), 3);
    assert.strictEqual(sumJsonNumbers({}), 0);
  });

  it("returns the sum of mixed arrays/objects", () => {
    assert.strictEqual(sumJsonNumbers({ a: [-1, 1] }), 0);
    assert.strictEqual(sumJsonNumbers([-1, { a: 1 }]), 0);
  });
});

describe("The solution to part one", () => {
  it("is correct", async () => {
    const data = await importData("./src/input/12.json");
    assert.strictEqual(sumJsonNumbers(data), 156_366);
  });
});

describe("The solution for part two", () => {
  it("filters out objects with values of 'red'", () => {
    assert.strictEqual(sumJsonNumbers([1, { c: "red", b: 2 }, 3], true), 4);
    assert.strictEqual(
      sumJsonNumbers({ d: "red", e: [1, 2, 3, 4], f: 5 }, true),
      0
    );
    assert.strictEqual(sumJsonNumbers([1, "red", 5], true), 6);
  });
});

describe("The solution to part two", () => {
  it("is correct", async () => {
    const data = await importData("./src/input/12.json");
    assert.strictEqual(sumJsonNumbers(data, true), 96_852);
  });
});

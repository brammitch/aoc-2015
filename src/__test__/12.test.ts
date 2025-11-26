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
    console.log("data", data);
    assert.strictEqual(sumJsonNumbers(data), 156_366);
  });
});

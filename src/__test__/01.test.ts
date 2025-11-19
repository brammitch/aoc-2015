import { describe, it } from "node:test";
import { getFloors } from "../01.js";
import assert from "node:assert";

describe("getFloors", () => {
  it("returns the final floor and the position at which the basement was first entered", async () => {
    const { floor, position } = await getFloors();
    assert.ok(floor === 74);
    assert.ok(position === 1795);
  });
});

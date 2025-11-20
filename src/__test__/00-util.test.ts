import assert from "node:assert";
import { describe, it } from "node:test";
import { isNumber } from "../00-util.js";

describe("isNumber", () => {
  it("checks if the input is a valid number", () => {
    assert.ok(isNumber(0));
    assert.ok(isNumber(500));
    assert.ok(isNumber("0"));
    assert.ok(isNumber("123"));
    assert.ok(isNumber("599.234"));
    assert.ok(!isNumber(null));
    assert.ok(!isNumber(undefined));
    assert.ok(!isNumber(false));
    assert.ok(!isNumber(true));
    assert.ok(!isNumber("abc123"));
    assert.ok(!isNumber("123abc456"));
  });
});

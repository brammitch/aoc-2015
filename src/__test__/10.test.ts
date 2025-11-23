import assert from "node:assert";
import { describe, it } from "node:test";
import { lookAndSay, processLookAndSay } from "../10.js";

describe("lookAndSay", () => {
  it("passes the examples", () => {
    assert.equal(lookAndSay("1"), "11");
    assert.equal(lookAndSay("11"), "21");
    assert.equal(lookAndSay("21"), "1211");
    assert.equal(lookAndSay("1211"), "111221");
    assert.equal(lookAndSay("111221"), "312211");
  });
});

describe("processLookAndSay", () => {
  it("solves the puzzle for input '3113322113', 40 times", () => {
    assert.equal(processLookAndSay("3113322113", 40), 329_356);
  });

  it("solves the puzzle for input '3113322113', 50 times", () => {
    assert.equal(processLookAndSay("3113322113", 50), 4_666_278);
  });
});

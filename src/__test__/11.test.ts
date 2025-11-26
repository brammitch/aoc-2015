import assert from "node:assert";
import { describe, it } from "node:test";
import {
  containsTwoDifferentPairs,
  hasIncreasingStraightOfThree,
  hasOnlyPermittedCharacters,
  incrementChar,
  partOneSolution,
} from "../11.js";

describe("hasIncreasingStraightOfThree", () => {
  it("passes all examples", () => {
    assert.ok(hasIncreasingStraightOfThree("abc"));
    assert.ok(hasIncreasingStraightOfThree("bcd"));
    assert.ok(hasIncreasingStraightOfThree("cde"));
    assert.ok(hasIncreasingStraightOfThree("xyz"));
    assert.ok(!hasIncreasingStraightOfThree("abd"));

    assert.ok(hasIncreasingStraightOfThree("hijklmmn"));
    assert.ok(!hasIncreasingStraightOfThree("abbceffg"));
  });
});

describe("hasOnlyPermittedCharacters", () => {
  it("passes all examples", () => {
    assert.ok(!hasOnlyPermittedCharacters("hijklmmn"));
    assert.ok(hasOnlyPermittedCharacters("abbceffg"));
    assert.ok(hasOnlyPermittedCharacters("abbcegjk"));
  });
});

describe("containsTwoDifferentPairs", () => {
  it("passes all examples", () => {
    assert.ok(!containsTwoDifferentPairs("hijklmmn"));
    assert.ok(containsTwoDifferentPairs("abbceffg"));
    assert.ok(!containsTwoDifferentPairs("abbcegjk"));
  });
});

describe("incrementChar", () => {
  it("returns the string after incrementing the character at the given index", () => {
    assert.strictEqual(incrementChar("a", 0)[0], "b");
    assert.strictEqual(incrementChar("abc", 1)[0], "acc");
    assert.strictEqual(incrementChar("potato", 4)[0], "potauo");
    assert.strictEqual(incrementChar("z", 0)[0], "a");
  });
});

describe("partOneSolution", () => {
  it("passes all the examples", () => {
    assert.strictEqual(partOneSolution("abcdefgh"), "abcdffaa");
    assert.strictEqual(partOneSolution("ghijklmn"), "ghjaabcc");
    assert.strictEqual(partOneSolution("cqjxjnds"), "cqjxxyzz");
    assert.strictEqual(partOneSolution("cqjxxyzz"), "cqkaabcc");
  });
});

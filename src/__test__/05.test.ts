import { describe, it } from "node:test";
import {
  getTotalNiceStringsCount,
  hasNaughtyString,
  hasRepeatingLetters,
  vowelCount,
} from "../05.js";
import assert from "node:assert";

describe("vowelCount", () => {
  it("counts the number of vowels in a string", () => {
    assert.equal(vowelCount("aei"), 3);
    assert.equal(vowelCount("xazegov"), 3);
    assert.equal(vowelCount("aeiouaeiouaeiou"), 15);
  });
});

describe("hasNaughtyString", () => {
  it("contains a naughty string", () => {
    assert.ok(hasNaughtyString("haegwjzuvuyypxyu"));
  });

  it("does not contain a naughty string", () => {
    assert.ok(!hasNaughtyString("ugknbfddgicrmopn"));
  });
});

describe("hasRepeatingLetters", () => {
  it("contains repeating letters", () => {
    assert.ok(hasRepeatingLetters("ugknbfddgicrmopn"));
    assert.ok(hasRepeatingLetters("aaa"));
  });

  it("does not contain repeating letters", () => {
    assert.ok(!hasRepeatingLetters("jchzalrnumimnmhp"));
  });
});

describe("getTotalNiceStringsCount", () => {
  it("counts the total number of nice strings from input", async () => {
    const numNiceStrings = await getTotalNiceStringsCount();

    assert.equal(numNiceStrings, 255);
  });
});

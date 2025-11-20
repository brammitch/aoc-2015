import { describe, it } from "node:test";
import {
  findSequentialEntries,
  getTotalNiceStringsCount,
  getTotalNiceStringsCountPartTwo,
  hasNaughtyString,
  hasRepeatingLetters,
  hasRepeatingLettersTwice,
  isRevisedNiceString,
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
  it("detects repeating letters", () => {
    assert.ok(hasRepeatingLetters("ugknbfddgicrmopn"));
    assert.ok(hasRepeatingLetters("aaa"));
    assert.ok(!hasRepeatingLetters("jchzalrnumimnmhp"));
  });

  it("detects repeating letters, separated by a specified gap size", () => {
    assert.ok(hasRepeatingLetters("xyx", 1));
    assert.ok(hasRepeatingLetters("abcdefeghi", 1));
    assert.ok(hasRepeatingLetters("aaa", 1));

    assert.ok(!hasRepeatingLetters("uurcxstgmygtbstg", 1));
  });
});

describe("getTotalNiceStringsCount", () => {
  it("counts the total number of nice strings from input", async () => {
    const numNiceStrings = await getTotalNiceStringsCount();

    assert.equal(numNiceStrings, 255);
  });
});

describe("findPairsByIndex", () => {
  it("finds number of occurrences of sequential numbers in an array, without overlapping", () => {
    assert.equal(findSequentialEntries([0, 1, 3, 12, 13, 20]), 2);
    assert.equal(findSequentialEntries([0, 1, 2, 3, 4]), 2);
    assert.equal(findSequentialEntries([0, 1, 2]), 1);
    assert.equal(
      findSequentialEntries([0, 1, 2, 3, 20, 21, 22, 30, 31, 32, 33]),
      5
    );
  });
});

describe("hasRepeatingLettersTwice", () => {
  it("checks if a string has a pair of any two letters that appear at least twice without overlapping", () => {
    assert.ok(hasRepeatingLettersTwice("xyxy"));
    assert.ok(hasRepeatingLettersTwice("aabcdefgaa"));
    assert.ok(hasRepeatingLettersTwice("qjhvhtzxzqqjkmpb"));
    assert.ok(hasRepeatingLettersTwice("xxyxx"));

    assert.ok(!hasRepeatingLettersTwice("aaa"));
    assert.ok(!hasRepeatingLettersTwice("ieodomkazucvgmuy"));
  });
});

describe("isRevisedNiceString", () => {
  it("checks if a string meetings the revised criteria for a 'nice string'", () => {
    assert.ok(isRevisedNiceString("qjhvhtzxzqqjkmpb"));
    assert.ok(isRevisedNiceString("xxyxx"));
    assert.ok(!isRevisedNiceString("uurcxstgmygtbstg"));
    assert.ok(!isRevisedNiceString("ieodomkazucvgmuy"));
  });
});

describe("getTotalNiceStringsCountPartTwo", () => {
  it("counts the total number of nice strings from input", async () => {
    const numNiceStrings = await getTotalNiceStringsCountPartTwo();

    assert.equal(numNiceStrings, 55);
  });
});

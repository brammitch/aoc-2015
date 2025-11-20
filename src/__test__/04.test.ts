import { describe, it } from "node:test";
import { findLowestNumberForHashWithLeadingZeroes } from "../04.js";
import assert from "node:assert";

describe("findLowestNumberForHash", () => {
  it("finds the lowest number for secret key abcdef with five zeroes", () => {
    const number = findLowestNumberForHashWithLeadingZeroes("abcdef", 5);

    assert.equal(number, 609_043);
  });

  it("finds the lowest number for secret key pqrstuv with five zeroes", () => {
    const number = findLowestNumberForHashWithLeadingZeroes("pqrstuv", 5);

    assert.equal(number, 1_048_970);
  });

  it("finds the lowest number for secret key ckczppom with five zeroes", () => {
    const number = findLowestNumberForHashWithLeadingZeroes("ckczppom", 5);

    assert.equal(number, 117_946);
  });

  it("finds the lowest number for secret key ckczppom with six zeroes", () => {
    const number = findLowestNumberForHashWithLeadingZeroes("ckczppom", 6);

    assert.equal(number, 3_938_038);
  });
});

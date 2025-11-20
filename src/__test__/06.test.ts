import assert from "node:assert";
import { describe, it } from "node:test";
import { getRandomNumber } from "../00-util.js";
import {
  countLightsTurnedOn,
  generateGrid,
  getNumberOfLightsLit,
  processInstruction,
  updateMatrix,
} from "../06.js";

describe("getNumberOfLightsLit", () => {
  it("returns the number of lights that are lit, after executing all instructions", async () => {
    const numberOfLightsLit = await getNumberOfLightsLit();

    assert.equal(numberOfLightsLit, 543_903);
  });
});

describe("generateGrid", () => {
  it("creates a matrix of size x, y with all values initialized to zero", () => {
    const x = getRandomNumber(1, 10); // Number of rows
    const y = getRandomNumber(1, 10); // Number of columns
    const M = generateGrid(x, y);

    assert.equal(M.size()[0], x);
    assert.equal(M.size()[1], y);
  });
});

describe("turnOn/turnOff", () => {
  it("sets all values in the given area from zero to one, and one to zero", () => {
    let M = generateGrid(2, 2);
    assert.equal(M(0, 0), 0);
    assert.equal(M(0, 1), 0);
    assert.equal(M(1, 0), 0);
    assert.equal(M(1, 1), 0);

    M = updateMatrix(M, 0, 0, 1, 1, "on");
    assert.equal(M(0, 0), 1);
    assert.equal(M(0, 1), 1);
    assert.equal(M(1, 0), 1);
    assert.equal(M(1, 1), 1);

    M = updateMatrix(M, 0, 0, 1, 1, "off");
    assert.equal(M(0, 0), 0);
    assert.equal(M(0, 1), 0);
    assert.equal(M(1, 0), 0);
    assert.equal(M(1, 1), 0);
  });
});

describe("toggleValues", () => {
  it("toggles values in the given area from zero to one, or one to zero", () => {
    /**
     * [
     *  [0, 0, 0],
     *  [0, 0, 0],
     *  [0, 0, 0],
     * ]
     */
    let M = generateGrid(3, 3);

    assert.equal(M(0, 0), 0);
    assert.equal(M(0, 1), 0);
    assert.equal(M(0, 2), 0);
    assert.equal(M(1, 0), 0);
    assert.equal(M(1, 1), 0);
    assert.equal(M(1, 2), 0);
    assert.equal(M(2, 0), 0);
    assert.equal(M(2, 1), 0);
    assert.equal(M(2, 2), 0);

    M = updateMatrix(M, 1, 0, 2, 1, "toggle");

    assert.equal(M(0, 0), 0);
    assert.equal(M(0, 1), 0);
    assert.equal(M(0, 2), 0);
    assert.equal(M(1, 0), 1);
    assert.equal(M(1, 1), 1);
    assert.equal(M(1, 2), 0);
    assert.equal(M(2, 0), 1);
    assert.equal(M(2, 1), 1);
    assert.equal(M(2, 2), 0);

    M = updateMatrix(M, 0, 0, 2, 2, "toggle");

    assert.equal(M(0, 0), 1);
    assert.equal(M(0, 1), 1);
    assert.equal(M(0, 2), 1);
    assert.equal(M(1, 0), 0);
    assert.equal(M(1, 1), 0);
    assert.equal(M(1, 2), 1);
    assert.equal(M(2, 0), 0);
    assert.equal(M(2, 1), 0);
    assert.equal(M(2, 2), 1);
  });
});

// 1_000_000 in a 1000x1000 grid
// turn on 0,0 through 999,999 turns on (or leaves on) every light
// toggle 0,0 through 999,0 toggles the first line of 1_000 lights
// turn off 499,499 through 500,500 turns off (or leaves off) the middle four lights
describe("testing problem scenarios", () => {
  it("turns on/off lights", () => {
    let M = generateGrid(1_000, 1_000);
    // turn on every light
    M = processInstruction(M, "turn on 0,0 through 999,999");
    assert.equal(countLightsTurnedOn(M), 1_000_000);
    // turn off the middle four lights
    M = processInstruction(M, "turn off 499,499 through 500,500");
    assert.equal(countLightsTurnedOn(M), 999_996);
  });

  it("toggles the first line of 1,000 lights", () => {
    let M = generateGrid(1_000, 1_000);
    M = processInstruction(M, "toggle 0,0 through 999,0");
    assert.equal(countLightsTurnedOn(M), 1_000);
  });
});

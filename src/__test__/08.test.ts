import assert from "node:assert";
import { open } from "node:fs/promises";
import { describe, it } from "node:test";
import { getCountPartOne, getCountPartTwo } from "../08.js";

describe("test sample input part one", () => {
  it("returns 12", async () => {
    const file = await open("./src/input/08.test.txt");
    const count = await getCountPartOne(file);

    assert.equal(count, 12);
  });
});

describe("test sample input part two", () => {
  it("returns 12", async () => {
    const file = await open("./src/input/08.test.txt");
    const count = await getCountPartTwo(file);

    assert.equal(count, 19);
  });
});

describe("solve problem part one", () => {
  it("returns the answer", async () => {
    const file = await open("./src/input/08.txt");
    const count = await getCountPartOne(file);

    assert.equal(count, 1_371);
  });
});

describe("solve problem part two", () => {
  it("returns the answer", async () => {
    const file = await open("./src/input/08.txt");
    const count = await getCountPartTwo(file);

    assert.equal(count, 2_117);
  });
});

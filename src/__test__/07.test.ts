import { describe, it } from "node:test";
import { open } from "node:fs/promises";
import assert from "node:assert";
import { isNumber } from "../00-util.js";
import {
  GATES,
  processInstructions,
  solvePartOne,
  solvePartTwo,
  type Gate,
  type Instruction,
} from "../07.js";

describe("Validate input", { skip: true }, () => {
  it("matches all instructions", async () => {
    let lines = 0;
    let matchedLines = 0;

    const file = await open("./src/input/07.txt");

    for await (const line of file.readLines()) {
      lines++;

      const instructions = line.split(" ");

      switch (instructions.length) {
        case 3: {
          let a: string | number = instructions[0]!;
          a = a && isNumber(a) ? parseInt(a) : a;
          if (typeof a === "string") {
            assert.match(a, /[a-z]+/);
          } else {
            assert.equal(typeof a, "number");
          }

          assert.equal(instructions[1], "->");

          const b: string = instructions[2]!;
          assert.match(b, /[a-z]+/);

          matchedLines++;
          break;
        }

        case 4: {
          const gate = instructions[0];
          assert.equal(gate, "NOT");

          let a: string | number = instructions[1]!;
          a = a && isNumber(a) ? parseInt(a) : a;
          if (typeof a === "string") {
            assert.match(a, /[a-z]+/);
          } else {
            assert.equal(typeof a, "number");
          }

          assert.equal(instructions[2], "->");

          const b: string = instructions[3]!;
          assert.match(b, /[a-z]+/);

          matchedLines++;
          break;
        }

        case 5: {
          let a: string | number = instructions[0]!;
          a = a && isNumber(a) ? parseInt(a) : a;
          if (typeof a === "string") {
            assert.match(a, /[a-z]+/);
          } else {
            assert.equal(typeof a, "number");
          }

          const gate = instructions[1] as Gate;
          assert.ok(GATES.includes(gate));

          let b: string | number = instructions[2]!;
          b = b && isNumber(b) ? parseInt(b) : b;
          if (typeof b === "string") {
            assert.match(b, /[a-z]+/);
          } else {
            assert.equal(typeof b, "number");
          }

          assert.equal(instructions[3], "->");

          const c: string = instructions[4]!;
          assert.match(c, /[a-z]+/);

          matchedLines++;
          break;
        }
      }
    }

    assert.equal(lines, matchedLines);
  });
});

describe("Test data", { skip: true }, () => {
  it("returns the expected signals", async () => {
    const instructions: Instruction[] = [];
    const file = await open("./src/__test__/07.test.txt");
    for await (const line of file.readLines()) {
      instructions.push(line.split(" ") as unknown as Instruction);
    }

    const wires = processInstructions(instructions);
    assert.equal(wires.x, 123);
  });
});

describe("solvePartOne", { skip: true }, () => {
  it("returns the signal provided to 'wire a'", async () => {
    const signal = await solvePartOne();
    assert.equal(signal.a, 46065);
  });
});

describe("solvePartTwo", () => {
  it("returns the signal provided to 'wire a'", async () => {
    const signal = await solvePartTwo();
    console.log("signal.b", signal.b);
    assert.equal(signal.a, 14134);
  });
});

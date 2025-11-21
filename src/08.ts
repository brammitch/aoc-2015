import type { FileHandle } from "node:fs/promises";

function looseJsonParse(obj: unknown): string {
  return eval?.(`"use strict";(${obj})`);
}

export async function getCountPartOne(file: FileHandle): Promise<number> {
  let numCharStringLiterals = 0;
  let numCharStringInMemory = 0;

  for await (const line of file.readLines()) {
    numCharStringLiterals += line.length;
    const parsed = looseJsonParse(line);
    numCharStringInMemory += parsed.length;
  }

  return numCharStringLiterals - numCharStringInMemory;
}

export async function getCountPartTwo(file: FileHandle): Promise<number> {
  let numCharStringLiterals = 0;
  let numCharStringEncoded = 0;

  for await (const line of file.readLines()) {
    numCharStringLiterals += line.length;
    const encoded = JSON.stringify(line);
    numCharStringEncoded += encoded.length;
  }

  return numCharStringEncoded - numCharStringLiterals;
}

import { open } from "node:fs/promises";

// Part 1
const VOWELS = ["a", "e", "i", "o", "u"];
const NAUGHTY_STRINGS = ["ab", "cd", "pq", "xy"];

export function vowelCount(str: string): number {
  return str.split("").filter((char) => VOWELS.includes(char)).length;
}

export function hasNaughtyString(str: string): boolean {
  return NAUGHTY_STRINGS.some((ns) => str.includes(ns));
}

export function hasRepeatingLetters(str: string, gap = 0): boolean {
  return (
    [...str].find((value, index, obj) => {
      if (index < obj.length - (1 + gap)) {
        return value === obj[index + (1 + gap)];
      }

      return false;
    }) !== undefined
  );
}

export function isNiceString(str: string): boolean {
  if (vowelCount(str) < 3) return false;
  if (hasNaughtyString(str)) return false;
  if (hasRepeatingLetters(str)) return true;

  return false;
}

export async function getTotalNiceStringsCount(): Promise<number> {
  let niceStringCount = 0;

  const file = await open("./src/input/05.txt");
  for await (const str of file.readLines()) {
    if (isNiceString(str)) {
      niceStringCount++;
    }
  }

  return niceStringCount;
}

// Part 2
export function hasRepeatingLettersTwice(str: string): boolean {
  const pairStore = new Map<string, Set<number>>();

  [...str].forEach((value, index, array) => {
    if (index < array.length - 1) {
      const key = `${value}${array[index + 1]}`;
      const values = pairStore.get(key);

      if (!values) {
        pairStore.set(key, new Set([index, index + 1]));
      } else {
        values.add(index);
        values.add(index + 1);
        pairStore.set(key, values);
      }
    }
  });

  const candidates = Array.from(pairStore.values()).filter(
    (values) => values.size >= 4
  );

  return (
    candidates.find((c) => findSequentialEntries([...c]) >= 2) !== undefined
  );
}

/**
 *
 * @param arr - an array of numbers
 * @param pairs - the number of non-overlapping sequential pairs (starts with zero)
 * @returns number of non-overlapping sequential pairs in the array
 */
export function findSequentialEntries(arr: number[], pairs = 0) {
  const pairIdx: number[] = [];

  arr.forEach((value, index, array) => {
    if (index < array.length - 1) {
      const match = value + 1 === array[index + 1];

      if (match) {
        pairIdx.push(index);
        pairIdx.push(index + 1);
      }
    }
  });

  if (pairIdx.length >= 2 && typeof pairIdx[0] === "number") {
    pairs++;
    arr.splice(pairIdx[0], 2);
    return findSequentialEntries(arr, pairs);
  }

  return pairs;
}

export function isRevisedNiceString(str: string): boolean {
  if (!hasRepeatingLetters(str, 1)) return false;
  if (hasRepeatingLettersTwice(str)) return true;

  return false;
}

export async function getTotalNiceStringsCountPartTwo(): Promise<number> {
  let niceStringCount = 0;

  const file = await open("./src/input/05.txt");
  for await (const str of file.readLines()) {
    if (isRevisedNiceString(str)) {
      niceStringCount++;
    }
  }

  return niceStringCount;
}

import { open } from "node:fs/promises";

const VOWELS = ["a", "e", "i", "o", "u"];
const NAUGHTY_STRINGS = ["ab", "cd", "pq", "xy"];

export function vowelCount(str: string): number {
  return str.split("").filter((char) => VOWELS.includes(char)).length;
}

export function hasNaughtyString(str: string): boolean {
  return NAUGHTY_STRINGS.some((ns) => str.includes(ns));
}

export function hasRepeatingLetters(str: string): boolean {
  return (
    [...str].find((value, index, obj) => {
      if (index < obj.length - 1) {
        return value === obj[index + 1];
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

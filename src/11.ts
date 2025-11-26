export function hasIncreasingStraightOfThree(str: string): boolean {
  const result = [...str].find((value, index, obj) => {
    if (
      typeof obj[index + 1] === "string" &&
      typeof obj[index + 2] === "string"
    ) {
      const firstValue = value.charCodeAt(0);
      const secondValue = obj[index + 1]!.charCodeAt(0) as number;
      const thirdValue = obj[index + 2]!.charCodeAt(0) as number;

      if (firstValue + 1 === secondValue && firstValue + 2 === thirdValue) {
        return true;
      }
    }

    return false;
  });

  return result ? true : false;
}

export function hasOnlyPermittedCharacters(str: string): boolean {
  return [...str].every((value) => {
    // Must be lower case letter
    if (value.charCodeAt(0) < 97 || value.charCodeAt(0) > 122) {
      return false;
    }

    // Cannot include confusing letters
    if (["i", "l", "o"].includes(value)) {
      return false;
    }

    return true;
  });
}

export function containsTwoDifferentPairs(str: string): boolean {
  const pairIndexSet = new Set<number>();
  [...str].forEach((value, index, array) => {
    if (array[index + 1] && array[index + 1] === value) {
      pairIndexSet.add(index);
      pairIndexSet.add(index + 1);
    }
  });

  return pairIndexSet.size >= 4;
}

export function incrementChar(
  str: string,
  idx: number
): [string, string, boolean] {
  const firstPartOfString = str.substring(0, idx);
  const charAtIndex = str.substring(idx, idx + 1);
  const lastPartOfString = str.substring(idx + 1);

  let nextCharCode = charAtIndex.charCodeAt(0) + 1;

  // Check if "z" -> "{"
  if (nextCharCode > 122) {
    // Reset to "a"
    nextCharCode -= 26;
  }
  const nextChar = String.fromCharCode(nextCharCode);

  const nextString = firstPartOfString + nextChar + lastPartOfString;
  const validPassword = checkPassword(nextString);
  return [nextString, nextChar, validPassword];
}

export function checkPassword(str: string): boolean {
  if (
    str.length === 8 &&
    hasIncreasingStraightOfThree(str) &&
    hasOnlyPermittedCharacters(str) &&
    containsTwoDifferentPairs(str)
  ) {
    return true;
  }

  return false;
}

export function partOneSolution(str: string): string {
  let nextPassword = str;
  let nextChar = "a";
  let isGoodPassword = false;

  let idx = str.length - 1;

  while (!isGoodPassword) {
    [nextPassword, nextChar, isGoodPassword] = incrementChar(nextPassword, idx);
    if (isGoodPassword) break;

    if (nextChar === "a") {
      idx -= 1;
    } else {
      idx = str.length - 1;
    }
  }

  return nextPassword;
}

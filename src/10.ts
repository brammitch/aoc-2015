export function processLookAndSay(input: string, times: number): number {
  let result = input;

  for (let i = 0; i < times; i++) {
    result = lookAndSay(result);
  }

  return result.length;
}

export function lookAndSay(input: string): string {
  let buffer = "";
  let result = "";

  [...input].forEach((char, i) => {
    buffer += char;

    if (!input[i + 1] || input[i + 1] !== char) {
      result += `${buffer.length}${char}`;
      buffer = "";
    }
  });

  return result;
}

export function getRandomNumber(min: number, max: number): number {
  min = Math.ceil(min); // Ensure min is an integer
  max = Math.floor(max); // Ensure max is an integer

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function isNumber(n: unknown) {
  if (typeof n === "number") return true;
  if (typeof n !== "string") return false;
  // @ts-ignore
  return !isNaN(parseFloat(n)) && !isNaN(n - 0);
}

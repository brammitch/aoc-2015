import crypto from "node:crypto";

export function findLowestNumberForHashWithLeadingZeroes(
  secretKey: string,
  numZeroes: number
): number {
  const targetSlice = Array(numZeroes).fill(0).join("");
  let actualSlice = "";
  let number = -1;

  while (actualSlice != targetSlice) {
    number++;

    const data = secretKey + number.toString();
    const hash = crypto.createHash("md5").update(data).digest("hex");

    actualSlice = hash.slice(0, numZeroes);
  }

  return number;
}

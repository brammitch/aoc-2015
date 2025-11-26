import fs from "node:fs/promises";

export async function importData(filename: string) {
  const file = await fs.readFile(filename, "utf-8");
  const json = await JSON.parse(file);

  return json;
}

export function sumJsonNumbers(json: unknown, sum = 0): number {
  if (typeof json === "string") {
    if (Number.isFinite(Number(json))) {
      return (sum += Number(json));
    } else {
      return sum;
    }
  } else if (typeof json === "number") {
    return (sum += json);
  } else if (Array.isArray(json)) {
    json.forEach((j) => (sum = sumJsonNumbers(j, sum)));
    return sum;
  } else if (typeof json === "object" && json !== null) {
    Object.entries(json).map(([k, v]) => {
      sum += sumJsonNumbers(k);
      sum += sumJsonNumbers(v);
    });
    return sum;
  }

  return sum;
}

console.log(sumJsonNumbers([1, 2, 3]));
console.log(sumJsonNumbers([[[3]]]));
console.log(sumJsonNumbers([]));

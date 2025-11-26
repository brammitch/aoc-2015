import fs from "node:fs/promises";

export async function importData(filename: string) {
  const file = await fs.readFile(filename, "utf-8");
  const json = await JSON.parse(file);

  return json;
}

export function sumJsonNumbers(
  json: unknown,
  redFilter = false,
  sum = 0
): number {
  if (typeof json === "string") {
    if (Number.isFinite(Number(json))) {
      return (sum += Number(json));
    } else {
      return sum;
    }
  } else if (typeof json === "number") {
    return (sum += json);
  } else if (Array.isArray(json)) {
    json.forEach((j) => (sum = sumJsonNumbers(j, redFilter, sum)));
    return sum;
  } else if (typeof json === "object" && json !== null) {
    // Filter on red
    if (redFilter && Object.values(json).some((v) => v === "red")) {
      return sum;
    }

    Object.values(json).map((v) => {
      sum += sumJsonNumbers(v, redFilter);
    });
    return sum;
  }

  return sum;
}

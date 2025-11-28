import { Permutation } from "js-combinatorics";
import { open } from "node:fs/promises";

type Seat = Record<string, number>;
type SeatMap = Map<string, Seat>;

export async function parseSeatingList(filename: string): Promise<SeatMap> {
  const seatMap: SeatMap = new Map<string, Record<string, number>>();

  const file = await open(filename);
  for await (const line of file.readLines()) {
    updateSeatMap(seatMap, line);
  }

  return seatMap;
}

function updateSeatMap(m: SeatMap, line: string): void {
  const words = line.split(" ");

  const from = words[0] as string;
  const to = words.at(-1)?.split(".")[0] as string;

  const modifier = words[2] === "lose" ? -1 : 1;
  const value = parseInt(words[3] as string, 10) * modifier;

  const seat = m.get(from);

  if (seat) {
    seat[to] = value;
    m.set(from, seat);
  } else {
    m.set(from, { [to]: value });
  }
}

export function getOptimalHappiness(seatMap: SeatMap, partTwo = false): number {
  if (partTwo) {
    updateMapForPartTwo(seatMap);
  }

  const values: number[] = [];
  const permutations = new Permutation([
    ...new Set(Array.from(seatMap.keys())),
  ]);

  // Trying to do the whole permutations array at once results in a maximum stack size error
  const quarter = Math.floor(Number(permutations.length) / 4);
  const q1 = permutations.toArray().slice(0, quarter);
  const q2 = permutations.toArray().slice(quarter, quarter * 2);
  const q3 = permutations.toArray().slice(quarter * 2, quarter * 3);
  const q4 = permutations
    .toArray()
    .slice(quarter * 3, Number(permutations.length));

  q4.forEach((ps) => {
    let sum = 0;

    ps.forEach((person, i) => {
      const seat = seatMap.get(person);

      if (seat) {
        // Get next person; if last, circle back to the first
        const nextPerson = ps[i + 1] ? ps[i + 1] : ps[0];
        if (nextPerson) {
          sum += seat[nextPerson] ?? 0;
        }
        // Get previous person; if first, circle back to the last
        const prevPerson = ps[i - 1] ? ps[i - 1] : ps.at(-1);
        if (prevPerson) {
          sum += seat[prevPerson] ?? 0;
        }
      }
    });

    values.push(sum);
  });

  return Math.max(...values);
}

function updateMapForPartTwo(seatMap: SeatMap): void {
  Array.from(seatMap.entries()).forEach(([k, v]) => {
    seatMap.set(k, { ...v, ["Me"]: 0 });
  });

  seatMap.set("Me", {});
  const keys = Array.from(seatMap.keys()).filter((k) => k !== "Me");
  keys.forEach((key) => {
    const seat = seatMap.get("Me");
    seatMap.set("Me", { ...seat, [key]: 0 });
  });
}

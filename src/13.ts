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

function updateSeatMap(m: SeatMap, line: string) {
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

export function getOptimalHappiness(seatMap: SeatMap): number {
  const values: number[] = [];
  const permutations = new Permutation([
    ...new Set(Array.from(seatMap.keys())),
  ]);

  [...permutations].forEach((p) => {
    let sum = 0;

    p.forEach((person, i) => {
      const seat = seatMap.get(person);

      if (seat) {
        // Get next person; if last, circle back to the first
        const nextPerson = p[i + 1] ? p[i + 1] : p[0];
        if (nextPerson) {
          sum += seat[nextPerson] ?? 0;
        }
        // Get previous person; if first, circle back to the last
        const prevPerson = p[i - 1] ? p[i - 1] : p.at(-1);
        if (prevPerson) {
          sum += seat[prevPerson] ?? 0;
        }
      }
    });

    values.push(sum);
  });

  return Math.max(...values);
}

console.log(getOptimalHappiness(await parseSeatingList("./src/input/13.txt")));

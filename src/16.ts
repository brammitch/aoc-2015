import { open } from "node:fs/promises";

interface Aunt {
  akitas: number;
  cars: number;
  cats: number;
  children: number;
  goldfish: number;
  perfumes: number;
  pomeranians: number;
  samoyeds: number;
  trees: number;
  vizslas: number;
}

const SUE_PROPS: Aunt = {
  akitas: 0,
  cars: 2,
  cats: 7,
  children: 3,
  goldfish: 5,
  perfumes: 1,
  pomeranians: 3,
  samoyeds: 2,
  trees: 3,
  vizslas: 0,
};

export async function parseAunts(filename: string): Promise<Partial<Aunt>[]> {
  const aunts: Partial<Aunt>[] = [];

  const file = await open(filename);
  for await (const line of file.readLines()) {
    const parse = line.match(
      /Sue (\d+): (\w+): (\d+), (\w+): (\d+), (\w+): (\d+)/
    );

    aunts.push({
      [parse![2]!]: parseInt(parse![3]!, 10),
      [parse![4]!]: parseInt(parse![5]!, 10),
      [parse![6]!]: parseInt(parse![7]!, 10),
    });
  }

  return aunts;
}

export function findMatchingAuntPartOne(aunts: Partial<Aunt>[]): number {
  let matchingAunt = 1;

  aunts.forEach((a, i) => {
    let numOfMatchingProps = 0;
    if (SUE_PROPS.akitas === a.akitas) numOfMatchingProps++;
    if (SUE_PROPS.cars === a.cars) numOfMatchingProps++;
    if (SUE_PROPS.cats === a.cats) numOfMatchingProps++;
    if (SUE_PROPS.children === a.children) numOfMatchingProps++;
    if (SUE_PROPS.goldfish === a.goldfish) numOfMatchingProps++;
    if (SUE_PROPS.perfumes === a.perfumes) numOfMatchingProps++;
    if (SUE_PROPS.pomeranians === a.pomeranians) numOfMatchingProps++;
    if (SUE_PROPS.samoyeds === a.samoyeds) numOfMatchingProps++;
    if (SUE_PROPS.trees === a.trees) numOfMatchingProps++;
    if (SUE_PROPS.vizslas === a.vizslas) numOfMatchingProps++;

    if (numOfMatchingProps === 3) {
      matchingAunt += i;
    }
  });

  return matchingAunt;
}

export function findMatchingAuntPartTwo(aunts: Partial<Aunt>[]): number {
  let matchingAunt = 1;

  aunts.forEach((a, i) => {
    let numOfMatchingProps = 0;
    if (SUE_PROPS.akitas === a.akitas) numOfMatchingProps++;
    if (SUE_PROPS.cars === a.cars) numOfMatchingProps++;
    if (a.cats !== undefined && a.cats > SUE_PROPS.cats) numOfMatchingProps++;
    if (SUE_PROPS.children === a.children) numOfMatchingProps++;
    if (a.goldfish !== undefined && a.goldfish < SUE_PROPS.goldfish)
      numOfMatchingProps++;
    if (SUE_PROPS.perfumes === a.perfumes) numOfMatchingProps++;
    if (a.pomeranians !== undefined && a.pomeranians < SUE_PROPS.pomeranians)
      numOfMatchingProps++;
    if (SUE_PROPS.samoyeds === a.samoyeds) numOfMatchingProps++;
    if (a.trees !== undefined && a.trees > SUE_PROPS.trees)
      numOfMatchingProps++;
    if (SUE_PROPS.vizslas === a.vizslas) numOfMatchingProps++;

    if (numOfMatchingProps === 3) {
      console.log("match", i);
      matchingAunt += i;
    }
  });

  return matchingAunt;
}

import { open } from "node:fs/promises";

export async function reindeerRaceForPoints(
  filename: string,
  seconds: number
): Promise<number> {
  const reindeers = await reindeerParser(filename);

  for (let i = 0; i < seconds; i++) {
    reindeers.forEach((r) => {
      r.incrementSecond();
    });

    const maxDistance = Math.max(...reindeers.map((r) => r.kmTraveled));

    reindeers
      .filter((r) => r.kmTraveled === maxDistance)
      .forEach((r) => r.scorePoint());
  }

  return Math.max(...reindeers.map((r) => r.points));
}

export async function getFastestReindeerDistance(
  filename: string,
  seconds: number
): Promise<number> {
  let distance = 0;

  const reindeers = await reindeerParser(filename);

  reindeers.forEach((r) => {
    const rDistance = r.getKmTraveled(seconds);
    if (rDistance > distance) {
      distance = rDistance;
    }
  });

  return distance;
}

export async function reindeerParser(filename: string): Promise<Reindeer[]> {
  const file = await open(filename);
  const reindeers: Reindeer[] = [];
  for await (const line of file.readLines()) {
    const parsed = line.match(
      /(\w+) can fly (\d+) km\/s for (\d+) seconds, but then must rest for (\d+) seconds./
    );
    const reindeer = new Reindeer(
      parsed![1]!,
      parseInt(parsed![2]!, 10),
      parseInt(parsed![3]!),
      parseInt(parsed![4]!)
    );

    reindeers.push(reindeer);
  }

  return reindeers;
}

export class Reindeer {
  name: string;
  flightSpeedKms: number;
  flightTime: number;
  restTime: number;
  restTimer: number;

  isFlying = true;
  flightTimer = 0;
  kmTraveled = 0;

  points = 0;

  constructor(name: string, flightSpeedKms = 0, flightTime = 0, restTime = 0) {
    this.name = name;
    this.flightSpeedKms = flightSpeedKms;
    this.flightTime = flightTime;
    this.restTime = restTime;
    this.restTimer = restTime;
  }

  scorePoint() {
    this.points++;
  }

  incrementSecond() {
    if (this.isFlying) {
      this.flightTimer++;
      this.kmTraveled += this.flightSpeedKms;
    }

    if (!this.isFlying) {
      this.restTimer--;
      if (this.restTimer === 0) {
        this.isFlying = true;
        this.restTimer = this.restTime;
      }
    }

    if (this.flightTimer >= this.flightTime) {
      this.isFlying = false;
      this.flightTimer = 0;
    }
  }

  getKmTraveled(seconds: number): number {
    let isFlying = true;
    let flightTimer = 0;
    let kmTraveled = 0;
    let restTimer = this.restTime;

    for (let i = 0; i < seconds; i++) {
      if (isFlying) {
        flightTimer++;
        kmTraveled += this.flightSpeedKms;
      }

      if (!isFlying) {
        restTimer--;
        if (restTimer === 0) {
          isFlying = true;
          restTimer = this.restTime;
        }
      }

      if (flightTimer >= this.flightTime) {
        isFlying = false;
        flightTimer = 0;
      }
    }

    return kmTraveled;
  }
}

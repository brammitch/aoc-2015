import { open } from "node:fs/promises";

/**
 *
 * @param l length
 * @param w width
 * @param h height
 * @returns {Object} measurements - Sqft and ft of wrapping paper and ribbon, respectively
 * @returns {number} measurements.paper - The paper required is the surface area of the box, plus the area of the smallest side.
 * @returns {number} measurements.ribbon - The ribbon required to wrap a present is the shortest distance around its sides, or the smallest perimeter of any one face. Each present also requires a bow made out of ribbon as well; the feet of ribbon required for the perfect bow is equal to the cubic feet of volume of the present. Don't ask how they tie the bow, though; they'll never tell.
 */
export function getWrappingPaperAndRibbonForGift(
  l: number,
  w: number,
  h: number
): { paper: number; ribbon: number } {
  let paper = 0;
  let ribbon = 0;

  // To get the smallest side of the rectangle, sort smallest to largest and take the first two entries
  const smallestSide = [l, w, h].sort((a, b) => a - b).slice(0, 2);

  // Surface area formula: 2*l*w + 2*w*h + 2*h*l
  const surfaceArea = 2 * l * w + 2 * w * h + 2 * h * l;
  const areaOfSmallestSide =
    (smallestSide?.[0] ?? 0) * (smallestSide?.[1] ?? 0);
  paper = surfaceArea + areaOfSmallestSide;

  const cubicVolume = l * w * h;
  const smallestPerimeter =
    (smallestSide?.[0] ?? 0) * 2 + (smallestSide?.[1] ?? 0) * 2;
  ribbon = cubicVolume + smallestPerimeter;

  return { paper, ribbon };
}

export async function getTotalWrappingPaper(): Promise<{
  sqftPaper: number;
  ftRibbon: number;
}> {
  // Each line is a right rectangular prism, formatted l x w x h
  // https://en.wikipedia.org/wiki/Cuboid#Rectangular_cuboid
  const file = await open("./src/input/02.txt");

  let sqftPaper = 0;
  let ftRibbon = 0;
  for await (const gift of file.readLines()) {
    const [l, w, h] = gift.split("x") as [string, string, string];
    const { paper, ribbon } = getWrappingPaperAndRibbonForGift(
      parseInt(l, 10),
      parseInt(w, 10),
      parseInt(h, 10)
    );

    sqftPaper += paper;
    ftRibbon += ribbon;
  }

  return { sqftPaper, ftRibbon };
}

const { sqftPaper, ftRibbon } = await getTotalWrappingPaper();
console.log(`The elves' need to order ${sqftPaper} sqft of wrapping paper.`);
console.log(`The elves' need to order ${ftRibbon} feet of ribbon.`);

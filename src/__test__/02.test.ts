import assert from "node:assert";
import { describe, it } from "node:test";
import {
  getTotalWrappingPaper,
  getWrappingPaperAndRibbonForGift,
} from "../02.js";

describe("getWrappingPaperForGift", () => {
  it("returns the sqft of wrapping paper required for a single gift", () => {
    const gift1 = getWrappingPaperAndRibbonForGift(2, 3, 4);
    const gift2 = getWrappingPaperAndRibbonForGift(1, 1, 10);

    assert.equal(gift1.paper, 58);
    assert.equal(gift2.paper, 43);

    assert.equal(gift1.ribbon, 34);
    assert.equal(gift2.ribbon, 14);
  });

  it("returns the total amount of wrapping paper needed for all gifts", async () => {
    const { ftRibbon, sqftPaper } = await getTotalWrappingPaper();

    assert.equal(sqftPaper, 1586300);
    assert.equal(ftRibbon, 3737498);
  });
});

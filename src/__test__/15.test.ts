import { describe, it } from "node:test";
import { calculateScore, getCombinations, parseIngredients } from "../15.js";
import assert from "node:assert";

describe("getCombinations", () => {
  it("solves for four ingredients", async () => {
    const ingredients = await parseIngredients("./src/input/15.txt");
    const highScore = getCombinations(ingredients);

    assert.strictEqual(highScore, 18_965_440);
  });

  it("solves for four ingredients with calorie limit", async () => {
    const ingredients = await parseIngredients("./src/input/15.txt");
    const highScore = getCombinations(ingredients, 500);

    assert.strictEqual(highScore, 15_862_900);
  });
});

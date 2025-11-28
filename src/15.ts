import { Permutation } from "js-combinatorics";
import { open } from "node:fs/promises";

interface Ingredient {
  name: string;
  capacity: number;
  durability: number;
  flavor: number;
  texture: number;
  calories: number;
}

const INGREDIENT_COUNT = 100;

export async function parseIngredients(
  filename: string
): Promise<Ingredient[]> {
  const ingredients: Ingredient[] = [];

  const file = await open(filename);
  for await (const line of file.readLines()) {
    const s1 = line.split(": ");
    const name = s1[0];

    const s2 = s1[1]?.split(", ");
    const capacity = parseInt(s2?.[0]?.split(" ")[1] ?? "0");
    const durability = parseInt(s2?.[1]?.split(" ")[1] ?? "0");
    const flavor = parseInt(s2?.[2]?.split(" ")[1] ?? "0");
    const texture = parseInt(s2?.[3]?.split(" ")[1] ?? "0");
    const calories = parseInt(s2?.[4]?.split(" ")[1] ?? "0");

    if (name) {
      ingredients.push({
        name,
        capacity,
        durability,
        flavor,
        texture,
        calories,
      });
    }
  }

  return ingredients;
}

export function getCombinations(
  ingredients: Ingredient[],
  targetCalories?: number
) {
  let highScore = 0;
  const distributions: Record<string, number>[] = [];

  for (let i = 0; i <= INGREDIENT_COUNT; i++) {
    for (let j = 0; i + j <= INGREDIENT_COUNT; j++) {
      for (let k = 0; i + j + k <= INGREDIENT_COUNT; k++) {
        for (let l = 0; i + j + k + l <= INGREDIENT_COUNT; l++) {
          if (i + j + k + l === 100) {
            distributions.push({
              [ingredients[0]!.name]: i,
              [ingredients[1]!.name]: j,
              [ingredients[2]!.name]: k,
              [ingredients[3]!.name]: l,
            });
          }
        }
      }
    }
  }

  for (let i = 0; i < distributions.length; i++) {
    const score = calculateScore(
      ingredients,
      distributions[i]!,
      targetCalories
    );
    if (score > highScore) {
      highScore = score;
    }
  }

  return highScore;
}

export function calculateScore(
  ingredients: Ingredient[],
  ingredientTracker: Record<string, number>,
  targetCalories?: number
): number {
  let capacity = 0;
  let durability = 0;
  let flavor = 0;
  let texture = 0;
  let calories = 0;

  for (const ingredient of ingredients) {
    capacity += ingredient.capacity * (ingredientTracker[ingredient.name] ?? 0);
    durability +=
      ingredient.durability * (ingredientTracker[ingredient.name] ?? 0);
    flavor += ingredient.flavor * (ingredientTracker[ingredient.name] ?? 0);
    texture += ingredient.texture * (ingredientTracker[ingredient.name] ?? 0);
    calories += ingredient.calories * (ingredientTracker[ingredient.name] ?? 0);
  }

  if (targetCalories === undefined || calories === targetCalories) {
    return (
      Math.max(capacity, 0) *
      Math.max(durability, 0) *
      Math.max(flavor, 0) *
      Math.max(texture, 0)
    );
  }

  return 0;
}

const ingredients = await parseIngredients("./src/input/15.txt");
console.log(getCombinations(ingredients));

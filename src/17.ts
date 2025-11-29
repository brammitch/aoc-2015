import { open } from "node:fs/promises";

async function parseNums(filename: string): Promise<number[]> {
  const nums: number[] = [];

  const file = await open(filename);
  for await (const line of file.readLines()) {
    nums.push(parseInt(line, 10));
  }

  return nums;
}

function combinationSum(candidates: number[], target: number) {
  const results: number[][] = [];

  // Sort candidates to handle duplicates and optimize pruning
  candidates.sort((a, b) => a - b);

  // Helper function for backtracking
  function backtrack(
    startIndex: number,
    currentCombination: number[],
    currentSum: number
  ) {
    // Base case 1: If currentSum exceeds target, prune this path
    if (currentSum > target) {
      return;
    }

    // Base case 2: If currentSum equals target, a valid combination is found
    if (currentSum === target) {
      results.push([...currentCombination]);
      return;
    }

    // Recursive case: Explore possibilities
    for (let i = startIndex; i < candidates.length; i++) {
      const candidate: number = candidates[i]!;

      currentCombination.push(candidate);
      // Recursively call backtrack with updated sum and combination
      backtrack(i + 1, currentCombination, currentSum + candidate);
      // Backtrack: Remove the last added element to explore other combinations
      currentCombination.pop();
    }
  }

  // Start the backtracking process
  backtrack(0, [], 0); // Start index, empty combination, initial sum

  return results;
}

export async function getCombinations(): Promise<[number, number, number]> {
  const nums = await parseNums("./src/input/17.txt");
  const combinations = combinationSum(nums, 150);
  const minNumberOfContainers = Math.min(...combinations.map((c) => c.length));
  const numberOfCombinationsMatchingMinimumNumberOfContainers =
    combinations.filter((c) => c.length === minNumberOfContainers).length;

  return [
    combinations.length,
    minNumberOfContainers,
    numberOfCombinationsMatchingMinimumNumberOfContainers,
  ];
}

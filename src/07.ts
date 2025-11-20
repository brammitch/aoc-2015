import { open } from "node:fs/promises";
import { isNumber } from "./00-util.js";

export type Instruction =
  | [string | number, "->", string]
  | ["NOT", string | number, "->", string]
  | [string | number, Gate, string | number, "->", string];

export type Gate = "AND" | "OR" | "NOT" | "LSHIFT" | "RSHIFT";
export const GATES: Gate[] = ["AND", "OR", "NOT", "LSHIFT", "RSHIFT"];

export function processInstructions(
  instructions: Instruction[],
  wires: Record<string, number> = {}
): Record<string, number> {
  const instructionsToRetry: Instruction[] = [];

  instructions.forEach((instruction) => {
    switch (instruction.length) {
      case 3: {
        // Instructions with a length of three have no gates
        const input = instruction[0];
        const output = instruction[2];

        // If the input is a signal (number), we can assign it to the output
        if (isNumber(input)) {
          wires[output] = parseInt(input as string, 10);
          break;
        }

        // If the input is a wire (string), check the wires to see if we already know the signal
        const inputSignal = wires[input];

        // If the lookup fails, retry on the next recursion
        if (inputSignal === undefined) {
          instructionsToRetry.push(instruction);
          break;
        }

        // If the lookup succeeded, add the signal to the wires object
        wires[output] = inputSignal;
        break;
      }

      case 4: {
        // Instructions with a length of four exclusively use the NOT gate; we'll follow the same flow as
        // 'case 3', except we'll need to use the BITWISE NOT (~) operator on the signal, if we find it
        const input = instruction[1];
        const output = instruction[3];

        if (isNumber(input)) {
          // Use & 0xFFFF to get the unsigned 16-bit value
          wires[output] = ~parseInt(input as string, 10) & 0xffff;
          break;
        }

        const inputSignal = wires[input];
        if (inputSignal === undefined) {
          instructionsToRetry.push(instruction);
          break;
        }

        wires[output] = ~inputSignal & 0xffff;
        break;
      }

      case 5: {
        // Instructions with a length of five have two inputs that will be affected by the gate;
        // we'll follow the same flow as before with two minor differences:
        // 1) we need to get both input signals before we can determine the output
        // 2) we'll apply a different operator to the input signals, depending on the gate
        const inputA = instruction[0];
        const gate = instruction[1];
        const inputB = instruction[2];
        const output = instruction[4];
        let signalA: number | undefined = undefined;
        let signalB: number | undefined = undefined;

        if (isNumber(inputA)) {
          signalA = parseInt(inputA as string, 10);
        } else {
          signalA = wires[inputA];
        }

        if (isNumber(inputB)) {
          signalB = parseInt(inputB as string, 10);
        } else {
          signalB = wires[inputB];
        }

        if (signalA !== undefined && signalB !== undefined) {
          switch (gate) {
            case "AND": {
              // Use & 0xFFFF to get the unsigned 16-bit value
              wires[output] = signalA & signalB & 0xffff;
              break;
            }

            case "OR": {
              wires[output] = (signalA | signalB) & 0xffff;
              break;
            }

            case "LSHIFT": {
              wires[output] = (signalA << signalB) & 0xffff;
              break;
            }

            case "RSHIFT": {
              wires[output] = (signalA >> signalB) & 0xffff;
              break;
            }
            default:
              // Should never happen
              throw new Error("Invalid gate operation!");
          }

          break;
        }

        instructionsToRetry.push(instruction);
        break;
      }
    }
  });

  if (
    instructionsToRetry.length > 0 &&
    // Eject from infinite loop if no new results are found
    instructionsToRetry.length !== instructions.length
  ) {
    return processInstructions(instructionsToRetry, wires);
  }

  return wires;
}

export async function solvePartOne(): Promise<number | undefined> {
  const instructions: Instruction[] = [];

  const file = await open("./src/input/07.txt");
  for await (const line of file.readLines()) {
    instructions.push(line.split(" ") as unknown as Instruction);
  }

  const wires = processInstructions(instructions);
  return wires?.a;
}

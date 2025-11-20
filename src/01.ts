export async function getFloors(input: string): Promise<{
  floor: number;
  position: number;
}> {
  let floor = 0;
  let basementEntered = false;
  let position = 0;

  [...input].forEach((value, index) => {
    switch (value) {
      case "(":
        floor++;
        break;
      case ")":
        floor--;
        break;
      default:
        break;
    }

    if (floor < 0 && !basementEntered) {
      position = index + 1;
      basementEntered = true;
    }
  });

  return { floor, position };
}

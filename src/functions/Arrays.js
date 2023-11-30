export function divideArrayIntoSubarrays(arr, subarraySize) {
  if (
    !Array.isArray(arr) ||
    !Number.isInteger(subarraySize) ||
    subarraySize <= 0
  ) {
    throw new Error(
      "Invalid input: The first argument must be an array and the second argument must be a positive integer."
    );
  }

  const result = [];
  for (let i = 0; i < arr.length; i += subarraySize) {
    result.push(arr.slice(i, i + subarraySize));
  }

  return result;
}

// val === val1 or val === val2
export const Eq1or2 = (val, val1, val2) => {
  return (
    val.toLowerCase() === val1.toLowerCase() ||
    val.toLowerCase() === val2.toLowerCase()
  );
};

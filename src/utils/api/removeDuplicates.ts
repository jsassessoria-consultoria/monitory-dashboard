export function removeDuplicates(arr: string[]): string[] {
  const uniqueValues: string[] = [];

  arr.forEach((value: string) => {
    if (!uniqueValues.includes(value) && typeof value === 'string') {
      uniqueValues.push(value);
    }
  });

  return uniqueValues;
}

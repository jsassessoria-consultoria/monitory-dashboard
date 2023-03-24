export function countBackupProcesses(
  array: { [key: string]: any }[]
) {
  let keys: string[] = [];
  let values: string[] = [];
  let result: { dia: string; processos: string }[] = [];
  for (const element of array) {
    keys = Object.keys(element);
    values = Object.values(element);
  }
  keys.forEach((data, i) => {
    result.push({ dia: keys[i], processos: values[i] });
  });

  return result;
}

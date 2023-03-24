export function filterByDate(
  array: any,
  startDate: string,
  endDate: string
) {
  const filteredObjects = array.filter((objeto: any) => {
    const data = new Date(objeto.date);
    const inicio = new Date(startDate);
    const fim = new Date(endDate);
    return data >= inicio && data <= fim;
  });

  filteredObjects.sort((a: any, b: any) =>
    a.date.localeCompare(b.date)
  );

  return filteredObjects;
}

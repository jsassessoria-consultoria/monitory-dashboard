export function filterByDate(
  array: any,
  startDate: string,
  endDate: string
) {
  return array.filter((objeto: any) => {
    const data = new Date(objeto.date);
    const inicio = new Date(startDate);
    const fim = new Date(endDate);
    return data >= inicio && data <= fim;
  });
}

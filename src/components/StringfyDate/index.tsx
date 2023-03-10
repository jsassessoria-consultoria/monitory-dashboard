
type Date = {
  startDate: String;
  endDate: String;
};
function StringfyDate(value: any) {
  
  const day1 = value?.[0].getDate();
  const month1 = value?.[0].getMonth()! + 1; //falando para ts que isso nao é undefined
  const year1 = value?.[0].getFullYear();

  const day2 = value?.[1].getDate();
  let month2 = value?.[1].getMonth()! + 1;
  const year2 = value?.[1].getFullYear();

  const date:Date = {
    startDate:
      year1 +
      '-' +
      String(month1).padStart(2, '0') +
      '-' +
      String(day1).padStart(2, '0'),
    endDate:
      year2 +
      '-' +
      String(month2).padStart(2, '0') +
      '-' +
      String(day2).padStart(2, '0')
  };
  
  return date;
}
export default StringfyDate;

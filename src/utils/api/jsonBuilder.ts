export function getAllBuilder(data: any) {
  let response: any = [];
  data.forEach((element: any) => {
    if (element.Token[0]) response.push(element);
  });
  return response;
}

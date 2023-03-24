export function getAllBuilder(data: any) {
  let response: any = [];
  data.forEach((element: any) => {
    if (element.Token[0]) response.push(element);
  });
  return response;
}

export function getAllTempoMonitoradoBuilder(array: any) {
  const objetosAgrupados: any = {};
  const arraysAgrupados: any = [];

  array.forEach((objeto: any) => {
    if (objeto.date in objetosAgrupados) {
      objetosAgrupados[objeto.date].push({
        nome: objeto.software,
        tempo: objeto.tempo,
        data: objeto.date
      });
    } else {
      objetosAgrupados[objeto.date] = [
        {
          nome: objeto.software,
          tempo: objeto.tempo,
          data: objeto.date
        }
      ];
    }
  });

  for (const date in objetosAgrupados) {
    arraysAgrupados.push(objetosAgrupados[date]);
  }

  return arraysAgrupados;
}

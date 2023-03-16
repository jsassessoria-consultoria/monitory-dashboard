export function getAllBuilder(data: any) {
  let response: any = [];
  data.forEach((element: { dispositivo: any }) => {
    const { dispositivo } = element;
    const { usuario, nome, id, localizacao } = dispositivo;
    response.push({ id, usuario, nome, localizacao });
  });
  return response;
}

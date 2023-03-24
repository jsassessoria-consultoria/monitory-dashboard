interface Dados {
  dia: string;
  processos: string;
}

interface Processo {
  name: string;
  time: number;
}

interface Resultado {
  dia: string;
  processos: Processo[];
}

export function countProcesses(dados: Dados): Resultado {
  let processos: { [nome: string]: number } = {};
  for (let processo of dados.processos) {
    if (processos[processo]) {
      processos[processo]++;
    } else {
      processos[processo] = 1;
    }
  }
  let resultado: Resultado = {
    dia: dados.dia,
    processos: []
  };
  for (let processo in processos) {
    resultado.processos.push({
      name: processo,
      time: processos[processo] * 10
    });
  }
  return resultado;
}

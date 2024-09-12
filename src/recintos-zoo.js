class RecintosZoo {
  constructor() {
    this.recintos = [
      {
        numero: 1,
        bioma: "savana",
        tamanho: 10,
        animais: [{ especie: "MACACO", quantidade: 3 }],
      },
      { numero: 2, bioma: "floresta", tamanho: 5, animais: [] },
      {
        numero: 3,
        bioma: "savana e rio",
        tamanho: 7,
        animais: [{ especie: "GAZELA", quantidade: 1 }],
      },
      { numero: 4, bioma: "rio", tamanho: 8, animais: [] },
      {
        numero: 5,
        bioma: "savana",
        tamanho: 9,
        animais: [{ especie: "LEAO", quantidade: 1 }],
      },
    ];

    this.animaisPermitidos = {
      LEAO: { tamanho: 3, bioma: "savana", carnivoro: true },
      LEOPARDO: { tamanho: 2, bioma: "savana", carnivoro: true },
      CROCODILO: { tamanho: 3, bioma: "rio", carnivoro: true },
      MACACO: { tamanho: 1, bioma: ["savana", "floresta"], carnivoro: false },
      GAZELA: { tamanho: 2, bioma: "savana", carnivoro: false },
      HIPOPOTAMO: { tamanho: 4, bioma: ["savana", "rio"], carnivoro: false },
    };
  }

  analisaRecintos(animal, quantidade) {
    // Verificação de animal e quantidade
    if (!this.animaisPermitidos[animal]) {
      return { erro: "Animal inválido" };
    }
    if (quantidade <= 0 || isNaN(quantidade)) {
      return { erro: "Quantidade inválida" };
    }

    const animalInfo = this.animaisPermitidos[animal];
    const recintosViaveis = [];

    // Verifica os recintos disponíveis
    for (const recinto of this.recintos) {
      // Verifica bioma adequado
      if (!animalInfo.bioma.includes(recinto.bioma)) continue;

      // Calcula ocupação dos animais atuais no recinto
      let ocupacaoAtual = recinto.animais.reduce(
        (total, a) =>
          total + a.quantidade * this.animaisPermitidos[a.especie].tamanho,
        0
      );
      let novoOcupacao = quantidade * animalInfo.tamanho;

      // Verifica se precisa de espaço extra para mais de uma espécie
      if (recinto.animais.length > 0 && recinto.animais[0].especie !== animal) {
        novoOcupacao += 1; // Espaço extra para múltiplas espécies
      }

      const espacoRestante = recinto.tamanho - ocupacaoAtual - novoOcupacao;

      

      // Verifica se o recinto tem espaço suficiente
      if (espacoRestante >= 0) {
        recintosViaveis.push(
          `Recinto ${recinto.numero} (espaço livre: ${espacoRestante} total: ${recinto.tamanho})`
        );
      }
    }

    // Retorna recintos viáveis ou mensagem de erro
    if (recintosViaveis.length > 0) {
      return { recintosViaveis };
    } else {
      return { erro: "Não há recinto viável" };
    }
  }
}

export { RecintosZoo as RecintosZoo };

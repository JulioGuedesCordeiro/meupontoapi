const bookshelf = require("../db");
const pontoModel = require("./ponto.model");

const montarDados = async (dado, usuarioID) => {
  const dadoFormatados = {
    id: dado.id,
    data: dado.data,
    hora_entrada: dado.hora_entrada,
    hora_saida_almoco: dado.hora_saida_almoco,
    hora_volta_almoco: dado.hora_volta_almoco,
    hora_saida: dado.hora_saida,
    hora_entra_extra: dado.hora_entra_extra,
    hora_saida_extra: dado.hora_saida_extra,
    usuario_id: usuarioID
  }
  return dadoFormatados;
};

const salvar = async (dado, usuarioID) =>
bookshelf.transaction(async (transacao) => {
  const objetoMontado = await montarDados(dado,usuarioID);
    try {
      const pontoCriado = await pontoModel.forge({
        id: objetoMontado.id
      }).save(objetoMontado);
      return pontoCriado;
    } catch (error) {
      throw error;
    }
  });

module.exports = {
  salvar
};

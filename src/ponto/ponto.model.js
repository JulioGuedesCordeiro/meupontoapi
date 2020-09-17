var bookshelf = require("../db");
var Usuario = require("../usuarios/usuarios.model");

var Ponto = bookshelf.Model.extend(
  {
    tableName: "ponto",
    hasTimestamps: ["criado_em", "atualizado_em"],
    usuario() {
      return this.belongsTo(Usuario, "usuario_id");
    },
  },
  {
    withRelated: ["usuario"],
    async listar(usuarioId) {
      let query;
        query = Ponto.query((ponto) => {
        ponto.where("usuario_id", "=", `${usuarioId}`);
        });
      return query.orderBy('id', 'desc').fetchAll();
    },
    async obter(id, usuarioId) {
      return this.forge({ id: id }).fetch();
    },
    async deletar(id) {
      return this.where("id", "=", id).destroy().then((resposta) => {console.log('JJJJ', resposta)});
    }
  }
);

module.exports = Ponto;

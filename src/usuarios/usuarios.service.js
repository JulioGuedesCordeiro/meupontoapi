const bookshelf = require("../db");
const usuariosModel = require("./usuarios.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const montarDados = async (dado) => {
  const dadosFormatados = {
    id: dado.id,
    nome: dado.nome,
    email: dado.email,
    senha: dado.senha,
    login: dado.login
  };
  const hash = await new Promise((resolve, reject) => {
    bcrypt.hash(dadosFormatados.senha, 10, function (err, hash) {
      if (err) reject(err);
      resolve(hash);
    });
  });
  dadosFormatados.senha = hash;
  return dadosFormatados;
};

const salvar = async (dado) =>
bookshelf.transaction(async (transacao) => {
  const objetoMontado = await montarDados(dado);
    try {
      const usuarioCriado = await usuariosModel
        .forge({
          id: objetoMontado.id,
        })
        .save(objetoMontado);
      return usuarioCriado;
    } catch (error) {
      throw error;
    }
  });

const login = async (dado, usuario) =>
  bookshelf.transaction(async (transacao) => {
    try {
      const resp = await new Promise((resolve, error) => {
        bcrypt.compare(dado.senha, usuario.get("senha"), (err, success) => {
          if (err) {
            return error(err);
          }
          resolve(success);
        });
      });
      if (resp) {
        const token = jwt.sign(
          {
            id: usuario.get("id"),
            nome: usuario.get("nome"),
            email: usuario.get("email"),
            login: usuario.get("login"),
            isAdmin: usuario.get("isAdmin"),
            situacao: usuario.get("situacao"),
          },
          process.env.KEY_JWT,
          {
            expiresIn: "1h",
          }
        );
        return token;
      }
      return false;
    } catch (error) {
      throw error;
    }
  });

module.exports = {
  salvar,
  login
};

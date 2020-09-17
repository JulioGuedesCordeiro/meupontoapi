const usuariosService = require("./usuarios.service");
const usuariosModel = require("./usuarios.model");
const Schema = require("./usuarios.schema");
const { NotFound, BadRequest } = require("../exceptions");

module.exports.cadastrar = async (req, res, next) => {
  const { error, value } = Schema.regrasCadastrar.validate(req.body);
  try {
    if (error) {
      return res.status(400).json(error);
    }
    usuario = await usuariosModel.obterPorEmail(req.body.email);
    if (usuario != null) {
      throw new NotFound("Esse email já está sendo usado por outro usuário");
    }
    const resposta = await usuariosService.salvar(req.body);
    return res
      .status(200)
      .json({ data: resposta, message: "Usuario Cadastrado com Sucesso" });
  } catch (erro) {
    return next(erro);
  }
};

module.exports.atualizar = async (req, res, next) => {
  try {
    usuario = await usuariosModel.obterPorId(req.params.id);
    if (usuario === null) {
      throw new NotFound("Usuário não encontrado");
    }
    const resposta = await usuariosService.salvar(req.body);
    return res
      .status(200)
      .json({ data: resposta, message: "Usuario atualizado com Sucesso" });
  } catch (erro) {
    return next(erro);
  }
};

module.exports.login = async (req, res, next) => {
  let usuario;
  try {
    if (req.body.login != undefined) {
      usuario = await usuariosModel.obterPorLogin(req.body.login);
    }
    if (req.body.email != undefined) {
      usuario = await usuariosModel.obterPorEmail(req.body.email);
    }
    if (usuario === null) {
      throw new NotFound("Usuário não encontrado");
    }
    if(usuario.get('situacao') === 'INATIVO') {
      throw new NotFound("Usuário não pode logar pois está inativo, falar com administrador");
    }
    const resposta = await usuariosService.login(req.body, usuario);
    if (resposta) {
      return res.status(200).json({ message: "Login efetuado com sucesso", token: resposta });
    } else {
      return res.status(400).json({ message: "Email ou senha inválido" });
    }
  } catch (erro) {
    return next(erro);
  }
};

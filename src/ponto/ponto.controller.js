const pontoService = require('./ponto.service');
const pontoModel = require('./ponto.model');
const Schema = require('./ponto.schema');
const { NotFound, BadRequest } = require('../exceptions');


module.exports.listar = async (req, res, next) => {
  try {
    const lista = await pontoModel.listar(req.usuario.id);
    const { models } = lista;
    return res.status(200).json({ data: models });
  } catch (erro) {
    return next(erro);
  }
};

module.exports.obter = async (req, res, next) => {
  try {
    const resposta = await pontoModel.obter(req.params.id);
    if(resposta.toJSON().usuario_id != req.usuario.id) {
        throw new NotFound(`Esse ponto o qual está buscando não é um ponto seu`);
    }
    if (resposta === null) {
      throw new NotFound(`A ponto ${req.params.id} não foi encontrada`);
    }
    return res.status(200).json({ data: resposta });
  } catch (erro) {
    return next(erro);
  }
};

module.exports.salvar = async (req, res, next) => {
  const { error, value } = Schema.regras.validate(req.body);
  try {
    if (error) {
      throw new BadRequest(error);
    }
    const resposta = await pontoService.salvar(value, req.usuario.id);
    return res.status(200).json({ data: resposta, message: 'Ponto cadastrado com Sucesso' });
  } catch (erro) {
    return next(erro);
  }
};


module.exports.editar = async (req, res, next) => {
  const { error, value } = Schema.regras.validate(req.body);
  try {
    if (error) {
      throw new BadRequest(error);
    }
    const resposta = await pontoService.salvar(value, req.usuario.id);
    return res.status(200).json({ data: resposta, message: 'Ponto atualizado com Sucesso' });
  } catch (erro) {
    return next(erro);
  }
};


module.exports.deletar = async (req, res, next) => {
  try {
    const dado = await pontoModel.obter(req.params.id);
    if(dado.toJSON().usuario_id != req.usuario.id) {
        throw new NotFound(`Esse ponto o qual está buscando não é um ponto seu`);
    }
    const resposta = await pontoModel.deletar(req.params.id);
    return res.status(200).json({ data: resposta, message: 'Ponto Deletado com Sucesso' });
  } catch (erro) {
    return next(erro);
  }
};

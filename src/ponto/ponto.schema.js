const joi = require('joi');

const regras = joi.object().keys({
    data: joi.string().min(3).max(20),
    hora_entrada: joi.string().min(3).max(20),
    hora_saida_almoco: joi.string().min(3).max(20),
    hora_volta_almoco: joi.string().min(3).max(20),
    hora_saida: joi.string().min(3).max(20),
    hora_entra_extra: joi.string().optional().allow('').min(3).max(20),
    hora_saida_extra: joi.string().optional().allow('').min(3).max(20),
    id: joi.allow(null).optional(),
    criado_em: joi.allow(null).optional(),
    atualizado_em: joi.allow(null).optional(),
    usuario_id: joi.allow(null).optional()
});

module.exports = {
  regras,
};



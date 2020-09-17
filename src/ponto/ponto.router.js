const express = require("express");
const controller = require("./ponto.controller");
const authorizationVerify = require("../middleware/verificaToken");

const api = express.Router();

api.get("/ponto/:id", authorizationVerify, controller.obter);
api.get("/ponto/", authorizationVerify, controller.listar);
api.post("/ponto", authorizationVerify, controller.salvar);
api.put("/ponto/:id", authorizationVerify, controller.editar);
api.delete("/ponto/:id", authorizationVerify, controller.deletar);

module.exports = api;
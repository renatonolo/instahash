//Carregar as dependências
var express = require('express');
var router = express.Router();

//Carregas as models
var UsersModel = require('../models/UsersModel.js');
var usersModel = new UsersModel();

//Configurando as rotas
router.get("/", function(req, res){
    //Renderiza a index...
    res.render('../src/views/index.ejs', {username: '', msgError: ''});
});

router.get("/callbackLogin", function(req, res){
    //Limpa a url de callback
    let originalUrl = req.protocol + "://" + req.get('host') + req.originalUrl;
    let url = originalUrl.split("?code");

    //Faz o request do token...
    usersModel.getToken(url[0], req.query.code, res);
});

module.exports = router;

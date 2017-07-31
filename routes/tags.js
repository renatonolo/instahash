//Carregar as dependências
var express = require('express');
var router = express.Router();

//Carregas as models
var TagsModel = require('../models/TagsModel.js');
var tagsModel = new TagsModel();

//Configurando as rotas
router.get("/:username/tag/:tag", function(req, res){
    //Pesquisa a tag no instagram e retorna no formato json...
    let tag = req.params.tag;
    let username = req.params.username;

    tagsModel.getTag(username, tag, '', res);
});

router.get("/:username/tag/:tag/:min_tag_id", function(req, res){
    //Pesquisa a tag no instagram de acordo com o min_tag_id
    //e retorna no formato json...
    let tag = req.params.tag;
    let username = req.params.username;
    let min_tag_id = req.params.min_tag_id;

    tagsModel.getTag(username, tag, min_tag_id, res);
});

router.get("/:username/historico", function(req, res){
    //Pesquisa o histórico de pesquisar do usuário e retorna no formato
    //json...
    let username = req.params.username;

    tagsModel.getHistorico(username, res);
});

router.post("/:username/tag/:tag/salvarHistorico", function(req, res){
    //Salva os items de uma pesquisa do usuário no histórico
    let username = req.params.username;
    let tag = req.params.tag;
    let items = req.body;

    tagsModel.salvarHistorico(username, tag, items, res);
});

router.delete("/:username/tag/:tag/deletar", function(req, res){
    //Deleta uma tag do histórico de tags do usuário
    let username = req.params.username;
    let tag = req.params.tag;

    tagsModel.deletarTagHistorico(username, tag, res);
});

module.exports = router;

'use strict';

//Carrega as dependências
var config = require('config');
var request = require('request');
var mongoose = require('mongoose');

var UsersModel = require('./UsersModel.js');

//Classe Model de usuários
class TagsModel {
    //Constructor
    constructor(){
        this.Tag = mongoose.model('tags');
        this.usersModel = new UsersModel();
    }

    //Busca a tag de acordo com o usuário
    //e o min_tag_id passados por parametro.
    async getTag(username, tag, min_tag_id, res){
        try{
            var that = this;
            let token = await this.usersModel.getTokenByUsername(username);

            if(token){
                let url = config.instagram.url.tags;
                url += tag + "/media/recent";
                url += "?access_token=" + token.access_token;

                if(min_tag_id && min_tag_id != '')
                    url += '&min_tag_id=' + min_tag_id;

                request.get(url, function(error, response, body){
                    let json = {'status': 400};
                    if(!error){
                        let jsonBody = JSON.parse(body);

                        if(!jsonBody.data) jsonBody.data = [];
                        if(!jsonBody.pagination) jsonBody.pagination = {};

                        json = {
                            'status': 200,
                            'data': jsonBody.data,
                            'pagination': jsonBody.pagination
                        };
                        that.salvarHistorico(username, tag, jsonBody.data);
                    }

                    res.jsonp(json);
                });
            } else {
                let json = {'status': 400};
                res.json(json);
            }
        } catch(error){
            let json = {'status': 400};
            res.json(json);
        }
    }

    //Salva o resultado de uma pesquisa de tag para poder
    //consultar o histórico depois...
    salvarHistorico(username, tag, data){
        var that = this;

        this.Tag.findOne({username: username, tag: tag}, '', function(err, result){
            if(!err){
                if(!result){
                    let historico = new that.Tag({
                        username: username,
                        tag: tag,
                        results: data
                    });
                    historico.save();
                } else {
                    for(let i = 0; i < data.length; i++){
                        let itemToSave = data[i];
                        if(!that.isSaved(itemToSave, result.results))
                            result.results.push(itemToSave);
                    }
                    result.save();
                }
            }
        });
    }

    //Pega o histórico de pesquisar do usuário, de acordo com o username.
    getHistorico(username, res){
        this.Tag.find({username: username}, function(err, result){
            if(!err) res.jsonp(result);
            else res.jsonp({});
        });
    }

    //Checa se um item já está salvo naquela tag.
    //Se o item estiver salvo, retorna true. Caso não esteja, retorna false...
    isSaved(itemToSave, itemsSaved){
        for(let i = 0; i < itemsSaved.length; i++){
            let item = itemsSaved[i];
            if(itemToSave.id == item.id) return true;
        }

        return false;
    }
}

module.exports = TagsModel;

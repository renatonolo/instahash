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
                let url = "https://api.instagram.com/v1/tags/";
                url += tag + "/media/recent";
                url += "?access_token=" + token.access_token;

                if(min_tag_id && min_tag_id != '')
                    url += '&min_tag_id=' + min_tag_id;

                request.get(url, function(error, response, body){
                    let json = {'status': 400};
                    if(!error){
                        let jsonBody = JSON.parse(body);
                        json = {
                            'status': 200,
                            'data': jsonBody.data,
                            'pagination': jsonBody.pagination
                        };
                        that.salvarHistorico(tag, jsonBody.data);
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
    salvarHistorico(tag, data){
        var that = this;

        this.Tag.findOne({tag: tag}, 'results', function(err, result){
            if(!err){
                if(!result){
                    let historico = new that.Tag({
                        tag: tag,
                        results: data
                    });
                    historico.save(function(err, result){
                        console.log(err);
                        console.log(result);
                    });
                } else {
                    for(let i = 0; i < data.length; i++){
                        let itemToSave = data[i];
                        if(!that.isSaved(itemToSave, result.results))
                            result.results.push(itemToSave);
                    }
                    result.save(function(err, result1){
                        console.log(err);
                        console.log(result1);
                    });
                }
            }
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

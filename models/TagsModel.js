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

    async getTag(username, tag, min_tag_id, res){
        try{
            var that = this;
            let token = await this.usersModel.getTokenByUsername(username);

            if(token){
                let url = "https://api.instagram.com/v1/tags/" + tag + "/media/recent?access_token=" + token.access_token;

                if(min_tag_id && min_tag_id != '')
                    url += '&min_tag_id=' + min_tag_id;
                
                request.get(url, function(error, response, body){
                    if(!error){
                        let jsonBody = JSON.parse(body);
                        let json = {
                            'status': 200,
                            'data': jsonBody.data,
                            'pagination': jsonBody.pagination
                        };
                        res.jsonp(json);
                    } else {
                        let json = {'status': 400};
                        res.json(json);
                    }
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
}

module.exports = TagsModel;

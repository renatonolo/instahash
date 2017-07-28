'use strict';

//Carrega as dependências
var config = require('config');
var request = require('request');
var mongoose = require('mongoose');

//Classe Model de usuários
class UsersModel {

    //Constructor
    constructor(){
        //Define o schema tokens
        this.schema = new mongoose.Schema(
            {
                username: {type: String, default: ''},
                access_token: {type: String, default: ''}
            }
        );

        //Carrega ou cria o schema tokens
        this.Token = mongoose.model(
            'tokens',
            this.schema
        );
    }

    /*
     *Recebe o code do Instagram e faz o request
     *do access_token, para poder consumir a API
     *do Instagram
     */
    getToken(redirect_uri, code, res) {
        var that = this;

        //Parâmetros necessários para o request do access_token
        let postOptions = {
            url: config.instagram.url.access_token,
            form: {
                client_id: config.instagram.client_id,
                client_secret: config.instagram.client_secret,
                grant_type: config.instagram.grant_type,
                redirect_uri: redirect_uri,
                code: code
            }
        };

        request.post(postOptions, function(error, response, body){
            if(!error && response.statusCode == 200){
                if(body){
                    let data = JSON.parse(response.body);
                    that.saveToken(data.user.username, data.access_token, res);
                }
            } else {
                res.render('../src/views/index.ejs', {username: '', msgError: 'Erro ao requisitar o token do Instagram.'});
            }
        });
    }

    //Salva o token  no mongo db
    saveToken(username, access_token, res){
        var token = {
            username: username,
            access_token: access_token
        };

        this.Token.findOneAndUpdate({username: username}, token, {upsert: true, setDefaultsOnInsert: true}, function(err, result){
            if(!err){
                res.render('../src/views/index.ejs', {username: username, msgError: ''});
            }
        });
    }
}

module.exports = UsersModel;

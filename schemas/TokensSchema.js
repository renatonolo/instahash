var mongoose = require('mongoose');

class TokenSchema {
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
}

module.exports = TokenSchema;

var mongoose = require('mongoose');

class TagsSchema {
    constructor(){
        //Define o schema tokens
        this.schema = new mongoose.Schema(
            {
                username: {type: String, default: ''},
                tag: {type: String, default: ''},
                results: {type: Array, default: ''}
            }
        );

        //Carrega ou cria o schema tokens
        this.Tags = mongoose.model(
            'tags',
            this.schema
        );
    }
}

module.exports = TagsSchema;

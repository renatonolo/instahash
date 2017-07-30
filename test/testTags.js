var assert = require('assert');

//Carrega os schemas
var TokensSchema = require('../schemas/TokensSchema.js');
new TokensSchema();
var TagsSchema = require('../schemas/TagsSchema.js');
new TagsSchema();

var TagsModel = require('../models/TagsModel.js');
var tagsModel = new TagsModel();

describe('Testando isSaved()', function(){
    it('...item salvo', function(){
        var itemToSave = {id: 5};
        var itemsSaved = [
            {id: 1},
            {id: 2},
            {id: 3}
        ];

        try {
            assert.equal(true, tagsModel.isSaved(itemToSave, itemsSaved), "o item deveria estar salvo...");
        } catch(e) {
            console.log(e);
        }
    });

    it('...item não salvo', function(){
        var itemToSave = {id: 5};
        var itemsSaved = [
            {id: 1},
            {id: 2},
            {id: 3}
        ];

        try {
            assert.equal(false, tagsModel.isSaved(itemToSave, itemsSaved), "o item não deveria estar salvo...");
        } catch(e) {
            console.log(e);
        }
    });
});

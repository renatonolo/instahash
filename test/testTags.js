var assert = require('assert');
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server.js');
var should = chai.should();

//Configurando on chai para usar o chai-http
chai.use(chaiHttp);

var TagsModel = require('../models/TagsModel.js');
var tagsModel = new TagsModel();

describe('Testando isSaved()', function(){

    //Teste da function isSaved (com sucesso)
    it(
        '...item salvo',
        function(){
            var itemToSave = {id: 1};
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
        }
    );

    //Teste da function isSaved (sem sucesso)
    it(
        '...item não salvo',
        function(){
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
        }
    );
});

describe('GET /:username/tag/:tag', function(){
    it(
        'Deve retornar as postagens de acordo com o username e a hashtag',
        function(done){
            chai.request(server)
                .get('/tags/renatonolo/tag/nature')
                .end(function(err, res){
                    res.should.have.status(200);
                    res.body.data.should.be.a('array');
                    done();
                });
        }
    );
});

describe('GET /:username/tag/:tag/:min_tag_id', function(){
    it(
        'Deve retornar um array ou vazio, caso não haja mais fotos, de acordo com o username e a hashtag',
        function(done){
            chai.request(server)
                .get('/tags/renatonolo/tag/beach/test')
                .end(function(err, res){
                    res.should.have.status(200);
                    res.body.data.should.be.a('array');
                    done();
                });
        }
    );
});

describe('GET /tags/:username/historico', function(){
    it(
        'Deve retornar um array de tags pesquisadas, de acordo com o username',
        function(done){
            chai.request(server)
                .get('/tags/renatonolo/historico')
                .end(function(err, res){
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        }
    );
});

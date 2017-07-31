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

describe('POST /tags/:username/tag/:tag/salvarHistorico', function(){
    it(
        'Deve salvar uma tag no histórico de tags.',
        function(done){
            chai.request(server)
                .post('/tags/renatonolo/tag/beach/salvarHistorico')
                .send([{users_in_photo:[],attribution:null,location:{id:613446217,name:"Machupicchu, Cusco, Peru",longitude:-72.5260803985,latitude:-13.1544705695},link:"https://www.instagram.com/p/BWLZ4T6nHpG/",type:"image",comments:{count:0},filter:"Reyes",tags:["alpaca","machupicchu","nature","peru"],likes:{count:19},user_has_liked:false,caption:{from:{username:"renatonolo",profile_picture:"https://scontent.cdninstagram.com/t51.2885-19/s150x150/18879448_1514370415279820_7613884178559401984_a.jpg",full_name:"Renato Nogueira Lourenço",id:"522784895"},created_time:"1499286282",text:"#machupicchu #alpaca #nature #peru",id:"17886737437011321"},created_time:"1499286282",images:{standard_resolution:{url:"https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/19764968_816005711893965_1859057146461683712_n.jpg",height:360,width:640},low_resolution:{url:"https://scontent.cdninstagram.com/t51.2885-15/s320x320/e35/19764968_816005711893965_1859057146461683712_n.jpg",height:180,width:320},thumbnail:{url:"https://scontent.cdninstagram.com/t51.2885-15/s150x150/e35/c236.0.608.608/19764968_816005711893965_1859057146461683712_n.jpg",height:150,width:150}},user:{username:"renatonolo",profile_picture:"https://scontent.cdninstagram.com/t51.2885-19/s150x150/18879448_1514370415279820_7613884178559401984_a.jpg",full_name:"Renato Nogueira Lourenço",id:"522784895"},id:"1552448317397170758_522784895"}])
                .end(function(err, res){
                    res.should.have.status(200);
                    JSON.parse(res.text).status.should.be.equal(200);
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

describe('DELETE /tags/:username/tag/:tag/deletar', function(){
    it(
        'Deve deletar uma tag do histórico de tags.',
        function(done){
            chai.request(server)
                .delete('/tags/renatonolo/tag/beach/deletar')
                .end(function(err, res){
                    res.should.have.status(200);
                    JSON.parse(res.text).status.should.be.equal(200);
                    done();
                });
        }
    );
});

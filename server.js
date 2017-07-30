'use strict';

//Carrega as dependências
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var config = require('config');

//Carrega os schemas
var TokensSchema = require('./schemas/TokensSchema.js');
new TokensSchema();
var TagsSchema = require('./schemas/TagsSchema.js');
new TagsSchema();

//Carregar as rotas
var users = require('./routes/users.js');
var tags = require('./routes/tags.js');

//Conectar no mongo db
mongoose.connect(
    config.uriMongoDb, {
        useMongoClient: true
    }
);

//Configurar o express js
app.use(express.static(__dirname + "/src"));
app.use("/bower_components", express.static(__dirname + "/bower_components"));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

app.use('/', users);
app.use('/tags', tags);

//Abre o servidor
app.listen(config.host.port);
console.log("Listenning on port: " + config.host.port);

module.exports = app;

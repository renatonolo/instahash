'use strict';

//Carrega as dependências
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var config = require('config');

//Carregar as rotas
var users = require('./routes/users.js')

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

//Abre o servidor
app.listen(config.host.port);
console.log("Listenning on port: " + config.host.port);

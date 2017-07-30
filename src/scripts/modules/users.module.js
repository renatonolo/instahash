'use strict';

//Declarando o módulo Users
angular.module('Users', [])
//Declarando o controller LoginController
.controller('LoginController', [
    '$scope',
    '$window',
    LoginController
])
//Declarando o HomeController
.controller('HomeController', [
    '$scope',
    '$rootScope',
    'UsersFactory',
    HomeController
])
//Declarando o HistoricoController
.controller('HistoricoController', [
    '$scope',
    '$rootScope',
    'UsersFactory',
    HistoricoController
]);

//Login controller
function LoginController($scope, $window){
    //Faz o login, enviando a request para o instagram, já com a url
    //de callback..
    $scope.btnLogin = function(){
        var url = "https://api.instagram.com/oauth/authorize/";
        url += "?client_id=48b53e55487f4e71a3313b4b14185175"
        url += "&redirect_uri=http://localhost:8000/callbackLogin";
        url += "&response_type=code";
        url += "&scope=public_content";

        $window.location.href = url;
    };
}

//Home controller
function HomeController($scope, $window, UsersFactory){
    $scope.activeTab = "/home";
    $scope.items = [];
    $scope.showCarregarMais = false;
    $scope.loading = false;

    //Captura a tag que o usuário colocou no text e envia para o servidor
    //para fazer a pesquisa no instagram..
    $scope.pesquisar = function(){
        $scope.loading = true;
        $scope.tag = document.getElementById("txt_hashtag").value;
        let username = localStorage.getItem("username");

        if(username != '' && $scope.tag != ''){
            UsersFactory.getHashtag(username, $scope.tag).then(function(res){
                console.log(res.data.data);
                $scope.min_tag_id = res.data.pagination.min_tag_id;
                $scope.items = res.data.data;
                if(res.data.data.length >= 20) $showCarregarMais = true;
                renderGallery();
            });
        } else $scope.loading = false;
    }

    //Captura a tag atual, bem como o min_tag_id atual e envia para o servidor
    //para pesquisar mais imagens com aquela tag..
    $scope.carregarMais = function(){
        $scope.loading = true;
        let username = localStorage.getItem("username");

        if(username != '' && $scope.tag){
            UsersFactory.getHashtag(username, $scope.tag, $scope.min_tag_id).then(function(res){
                if(res.data.data.length > 0){
                    $scope.min_tag_id = res.data.pagination.min_tag_id;
                    $scope.items.push(res.data.data);
                    if(res.data.data.length >= 20) $scope.showCarregarMais = true;
                    else $scope.showCarregarMais = false;
                    renderGallery();
                }
            });
        }
    }

    //Renderiza a galeria...
    function renderGallery(){
        $scope.loading = false;
        document.getElementById('links').onclick = function(event){
            event = event || window.event;
            var target = event.target || event.srcElement,
            link = target.src ? target.parentNode : target,
            options = {index: link, event: event},
            links = document.getElementsByTagName('a');
            blueimp.Gallery(links, options);
        }
    }
}

function HistoricoController($scope, $window, UsersFactory){

}

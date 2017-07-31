(function(){
    'use strict';

    //Declarando o módulo Users
    angular.module('Users', [])
    //Declarando o controller LoginController
    .controller('LoginController', [
        '$scope',
        '$window',
        'configs',
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
    function LoginController($scope, $window, configs){
        //Faz o login, enviando a request para o instagram, já com a url
        //de callback..
        $scope.btnLogin = function(){
            var url = configs.instagram.authorize;
            url += "?client_id=" + configs.instagram.client_id;
            url += "&redirect_uri=" + configs.instagram.redirect_uri;
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
        };

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
        };

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
            };
        }
    }

    //Definição do Historico controller
    function HistoricoController($scope, $window, UsersFactory){
        $scope.activeTab = "/historico";
        $scope.historico = [];
        $scope.loading = false;
        $scope.itemSelecionado = null;

        //Carrega a tela
        loadHistorico();

        //Busca o historico para ser mostrado na tela
        function loadHistorico(){
            $scope.loading = true;
            let username = localStorage.getItem("username");

            UsersFactory.getHistorico(username).then(function(tags){
                console.log(tags);
                $scope.historico = tags.data;
                $scope.loading = false;
            });
        }

        //Seleciona o item que o usuário clicou
        $scope.selecionarItem = function(item){
            $scope.itemSelecionado = item;
            renderGallery();
        };

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
            };
        }
    }
}());

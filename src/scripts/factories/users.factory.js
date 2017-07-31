(function(){
    'use strict';

    angular.module('Users')
    .factory("UsersFactory", [
        '$http',
        'configs',
        function($http, configs){
            let base = configs.base_url;

            return {
                //Pesquisa a hashtag direto no instagram...
                'getHashtag': function(username, hashtag, min_tag_id){
                    let request = "/tags/" + username + "/tag/" + hashtag;

                    if(min_tag_id && min_tag_id != '')
                        request += '/' + min_tag_id;

                    let url = base + request;

                    return $http.jsonp(url, null);
                },

                //Pega o histórico de pesquisar de acordo com o username
                //do usuário...
                'getHistorico': function(username){
                    let request = "/tags/" + username + "/historico";
                    let url = base + request;

                    return $http.jsonp(url);
                }
            };
        }
    ]);
}());

'use strict';

//Declarando o módulo Users
angular.module('Users', [])
//Declarando o controller LoginController
.controller('LoginController', [
    '$scope',
    '$window',
    function LoginController($scope, $window){
        $scope.btnLogin = function(){
            var url = "https://api.instagram.com/oauth/authorize/";
            url += "?client_id=48b53e55487f4e71a3313b4b14185175"
            url += "&redirect_uri=http://localhost:8000/callbackLogin";
            url += "&response_type=code";

            $window.location.href = url;
        };
    }
])
//Declarando o UsersController
.controller('UsersController', [
    '$scope',
    function UsersController($scope, $window){
        console.log("teste");
    }
]);

'use strict';

//Declarando os módulos
angular.module('Users', []);

//Declarando o módulo principal
angular.module(
    'InstaHashApp',
    [
        'ngRoute',
        'ui.bootstrap',
        'Users'
    ]
)
//Configurando o módulo principal
.config([
    '$locationProvider',
    '$routeProvider',

    function($locationProvider, $routeProvider){
        $locationProvider.hashPrefix('!');

        $routeProvider
            .when(
                '/login', {
                    templateUrl: "/views/users/login.html",
                    controller: 'LoginController'
                }
            )
            .when(
                '/home', {
                    templateUrl: "/views/users/home.html",
                    controller: 'HomeController'
                }
            )
            .otherwise(
                {
                    redirectTo: '/login'
                }
            );
    }
])
//Run the app
.run(function($location, $rootScope){
    $rootScope.$on('$locationChangeStart', function(event, next, current) {
        let hdd = document.getElementById("hdd_username");
        console.log("Hdd value: " + hdd.value);

        if(hdd.value != '')
            $location.path("/home");
    });
})

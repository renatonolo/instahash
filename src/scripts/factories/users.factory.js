'use strict';

angular.module('Users')
.factory("UsersFactory", [
    '$http',
    function($http){
        let base = "http://localhost:8000";

        return {
            'getHashtag': function(username, hashtag, min_tag_id){
                let request = "/tags/" + username + "/tag/" + hashtag;

                if(min_tag_id && min_tag_id != '')
                    request += '/' + min_tag_id;

                let url = base + request;

                return $http.jsonp(url, null);
            }
        };
    }
]);

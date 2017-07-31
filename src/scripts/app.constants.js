angular.module('InstaHashApp')
.constant(
    'configs',
    {
        base_url: 'http://localhost:8000',
        instagram: {
            authorize: 'https://api.instagram.com/oauth/authorize/',
            client_id: '48b53e55487f4e71a3313b4b14185175',
            redirect_uri: 'http://localhost:8000/callbackLogin'
        }
    }
);

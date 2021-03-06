// File: chapter10/routing-example/app/scripts/services.js
angular.module('fifaApp')
    .factory('FifaService', ['$rootScope',
        function ($rootScope) {
            var organizations = [];
            return {

                getTeams: function (callback) {
                    Tabletop.init({
                        key: '11AnLJIvae8DJRgaMZ9mkJjsN9RbR8gFyOK185821yc4',
                        simpleSheet: true,
                        parseNumbers: true,
                        callback: function (data, tabletop) {
                            if (callback && typeof(callback) === "function") {
                                $rootScope.$apply(function () {

                                    for(var i=0; i < data.length; i++) {

                                        if ( data[i].organization.length > 0 ) {
                                            console.log( 'aa ' + data[i].linktogithubinterview.length + ' - ' + data[i].linktogithubinterview);

                                            organizations[i] = data[i];
                                            organizations[i].id = i;
                                            organizations[i].show_interview = data[i].linktogithubinterview.length;
                                        }
                                    }

                                    console.dir(organizations);
                                    callback(organizations);
                                });
                            }
                        }
                    });
                },
                getTeamDetails: function (code) {

                    return organizations[code];
                    // return $http.get('/api/team/' + code);
                }
            }
        }])
    .factory('UserService', ['$http', function ($http) {
        var service = {
            isLoggedIn: false,

            session: function () {
                return $http.get('/api/session')
                    .then(function (response) {
                        service.isLoggedIn = true;
                        return response;
                    });
            },

            login: function (user) {
                return $http.post('/api/login', user)
                    .then(function (response) {
                        service.isLoggedIn = true;
                        return response;
                    });
            }
        };
        return service;
    }]);

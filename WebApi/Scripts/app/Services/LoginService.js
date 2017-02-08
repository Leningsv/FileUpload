var app = angular.module('app');
app.service('LoginService', ['$http', '$q', 'globalVar',
function ($http, $q, globalVar) {
    this.Login = function (user) {
        var defered = $q.defer();
        var promise = defered.promise;
        $http.post(globalVar.webApiUrl + 'Login/LoginUser', user).then(function onSuccess(response) {
            defered.resolve(response.data);
        }, function onError(response) {
            defered.reject(response);
        });
        return promise;
    };
}]);
var app = angular.module('app');
app.controller('MenuCtrl',
    ['$scope', '$sessionStorage', '$location',
    function ($scope, $sessionStorage, $location) {
        if ($sessionStorage.user !== undefined) {
            if ($sessionStorage.user.Logged === true) {
                $scope.displayName = $sessionStorage.user.Username;
            } else {
                $scope.displayName = "";
            }            
        } else {
            $scope.displayName = ""; 
        }
        $scope.username = '';
        $scope.password = '';
        $scope.Login = function () {
            var auxUser = {
                Username: $scope.username,
                Password: $scope.password
            };
            var Login = LoginService.Login(auxUser);
            Login.then(function (user) {
                $sessionStorage.user = user;
                if ($sessionStorage.user.Logged === true) {
                    $location.path('/Upload');
                }
            }, function (error) { });
        }
        $scope.Logged = function () {
            $scope.displayName = "";
            $sessionStorage.$reset();
            $location.path('/');
        }
    }]);
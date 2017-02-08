var app = angular.module('app');
app.controller('LoginCtrl',
    ['$scope', 'LoginService', '$sessionStorage','$location',
    function ($scope, LoginService, $sessionStorage, $location) {
        $scope.message = 'Inicie Sesión para Continuar.';
        $scope.messageStyle = 'col-xs-10 alert alert-info col-xs-offset-1';
        $scope.username='';
        $scope.password = '';

        $scope.Login = function () {
            $scope.message = 'Procesando Información.';
            $scope.messageStyle = 'col-xs-10 alert alert-warning col-xs-offset-1';
            var auxUser={
                Username: $scope.username,
                Password: $scope.password
            };
            var Login = LoginService.Login(auxUser);
            Login.then(function (user) {                               
                if (user.Logged === true) {
                    $sessionStorage.user = user;
                    $scope.message = 'Exito. Datos Correctos';
                    $scope.messageStyle = 'col-xs-10 alert alert-success col-xs-offset-1';
                    $scope.password = '';
                    $location.path('/Upload');
                }
            }, function (error) {
                $scope.message = 'Error de Acceso. Usuario o Password Incorrectos';
                $scope.messageStyle = 'col-xs-10 alert alert-danger col-xs-offset-1';
                $scope.password = '';
            });
        }
    }]);
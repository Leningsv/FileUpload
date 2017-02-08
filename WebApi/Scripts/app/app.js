var app = angular.module('app', [
    'ngRoute',
    'ngStorage',
    'ngCsvImport',
    'filereader',
    'angularFileUpload',
    'ae-datetimepicker',
    'ui.select',
    'ngDialog'
]);
app.config(function ($routeProvider, $compileProvider) {
    $routeProvider.when('/', {
        templateUrl: 'Templates/Login.html',
        controller:'LoginCtrl'
    }).when('/Upload', {
        templateUrl: 'Templates/Upload.html',
        controller: 'UploadCtrl',
        resolve: {
            authentication: function ($location, $sessionStorage) {
                if ($sessionStorage.user === undefined) {
                    $location.path('/');
                } else {
                    if ($sessionStorage.user.Logged === false) {
                        $location.path('/');
                    }
                }
            }
        }
    });
});
var app = angular.module('app');
app.service('UploadService', ['$http', '$q', 'globalVar',
function ($http, $q, globalVar) {
    this.UploadListCSV = function (listUpload) {
        var defered = $q.defer();
        var promise = defered.promise;
        $http.post(globalVar.webApiUrl + 'Upload/UploadListCSV', listUpload).then(function onSuccess(response) {
            defered.resolve(response.data);
        }, function onError(response) {
            defered.reject(response);
        });
        return promise;
    };
    this.UploadCsv = function (listUploadFileCsv) {
        var defered = $q.defer();
        var promise = defered.promise;
        $http.post(globalVar.webApiUrl + 'Upload/UploadCsv', listUploadFileCsv).then(function onSuccess(response) {
            defered.resolve(response.data);
        }, function onError(response) {
            defered.reject(response);
        });
        return promise;
    };
    this.ValidatePeriod = function (period) {
        var defered = $q.defer();
        var promise = defered.promise;
        $http.post(globalVar.webApiUrl + 'Upload/ValidatePeriod', period).then(function onSuccess(response) {
            defered.resolve(response.data);
        }, function onError(response) {
            defered.reject(response);
        });
        return promise;
    };
}]);
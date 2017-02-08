var app = angular.module('app');
app.controller('UploadCtrl',
    ['$scope', 'UploadService', 'FileReader', 'FileUploader', '$sessionStorage', 'ngDialog',
    function ($scope, UploadService, FileReader, FileUploader, $sessionStorage, ngDialog) {
        $scope.listCells = [
            { id: 1, name: 'CRS Regional Guayas' },
            { id: 2, name: 'CRS Regional Latacunga' },
            { id: 3, name: 'CRS Mixto Tulcan' },
            { id: 4, name: 'CRS Santo Domingo' },
            { id: 5, name: 'CRS Ambato' },
            { id: 6, name: 'CRS Quevedo' },
            { id: 7, name: 'CRS Turi' },
            { id: 8, name: 'CRS Femenino Guayas' },
            { id: 9, name: 'CRS Riobamba' },
            { id: 10, name: 'CRS Mixto Guaranda' },
            { id: 11, name: 'CRS Femenino Protoviejo' },
            { id: 12, name: 'CRS Regional Guaya Turi' },
            { id: 13, name: 'CRS Ibarra' }
        ];
        $scope.selected = { value: $scope.listCells[0] };
        $scope.date = new Date();
        $scope.itemFile = {};
        $scope.FileUpload = function (item) {
            var period = {
                AuxPeriod: date,
                Cell: $scope.selected.value.id,
                PeriodNumber: 0
            };
            var ValidatePeriod = UploadService.ValidatePeriod(period);
            ValidatePeriod.then(function (auxPeriod) {
                if (auxPeriod.PeriodNumber > 0) {
                    ngDialog.openConfirm({
                        template: '\
                        <p>Datos del periodo existentes, desea sobrescribirlos?</p>\
                        <div class="ngdialog-buttons">\
                            <button type="button" class="ngdialog-button ngdialog-button-secondary" ng-click="closeThisDialog()">No</button>\
                            <button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="confirm()">Si</button>\
                        </div>',
                        plain: true
                    }).then(function () {
                        $scope.FileUploadCSV(item);
                    }, function () {
                    });
                }
                else {
                    $scope.FileUploadCSV(item);
                }
            })        
        }
        $scope.FileUploadCSV = function (item) {
            FileReader.readAsDataURL(item._file, $scope).then(function (resp) {
                var string64 = resp.split(",");
                var listFileCsv = new Array();
                var fileCsv = {
                    File64: string64[1],
                    Address:'Address',
                    State:false,
                    Name: item._file.name,
                    Username: $sessionStorage.user.Username
                }
                listFileCsv.push(fileCsv);
                var UploadCsv = UploadService.UploadCsv(listFileCsv);
                UploadCsv.then(function (data) {
                    console.log(data)
                }, function (error) { });
                uploader.onProgressItem(item, 100);
                uploader.onProgressAll(100);
                // Do stuff
                //$scope.encoded = base64.encode(resp);
                console.log($scope.itemFile)
            }, function (err) {
                // Do stuff
            });
        }
        $scope.FileUploadAll = function (items) {
            var period = {
                AuxPeriod: date,
                Cell: $scope.selected.value.id,
                PeriodNumber: 0
            };
            var ValidatePeriod = UploadService.ValidatePeriod(period);
            ValidatePeriod.then(function (auxPeriod) {
                if (auxPeriod.PeriodNumber > 0) {
                    ngDialog.openConfirm({
                        template: '\
                        <p>Datos del periodo existentes, desea sobrescribirlos?</p>\
                        <div class="ngdialog-buttons">\
                            <button type="button" class="ngdialog-button ngdialog-button-secondary" ng-click="closeThisDialog()">No</button>\
                            <button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="confirm()">Si</button>\
                        </div>',
                        plain: true
                    }).then(function () {
                        $scope.FileUploadAllCSV(items);
                    }, function () {
                    });
                }
                else {
                    $scope.FileUploadAllCSV(items);
                }
            })
        }
        $scope.FileUploadAllCSV = function (items) {
            var listFileCsv = new Array();
            items.queue.forEach(function (item, index) {                
                FileReader.readAsDataURL(item._file, $scope).then(function (resp) {
                    var string64 = resp.split(",");
                    var fileCsv = {
                        File64: string64[1],
                        Address: 'Address',
                        State: false,
                        Name: item._file.name,
                        Username: $sessionStorage.user.Username
                    }
                    listFileCsv.push(fileCsv);                    
                    if (listFileCsv.length === items.queue.length)
                    {
                        if (index === (listFileCsv.length - 1)) {
                            var UploadCsv = UploadService.UploadCsv(listFileCsv);
                            UploadCsv.then(function (data) {
                                console.log(data)
                            }, function (error) { });
                            uploader.onProgressItem(item, 100);
                            uploader.onProgressAll(100);
                        }   
                    }                                    
                }, function (err) {
                    // Do stuff
                });
            }, this);
        }
        // FILTERS
        var uploader = $scope.uploader = new FileUploader({
            url: ''
        });
        uploader.filters.push({
            name: 'customFilter',
            fn: function (item /*{File|FileLikeObject}*/, options) {
                return this.queue.length < 10;
            }
        });

        // CALLBACKS

        uploader.onWhenAddingFileFailed = function (item /*{File|FileLikeObject}*/, filter, options) {
            console.info('onWhenAddingFileFailed', item, filter, options);
        };
        uploader.onAfterAddingFile = function (fileItem) {
            console.info('onAfterAddingFile', fileItem);
        };
        uploader.onAfterAddingAll = function (addedFileItems) {
            console.info('onAfterAddingAll', addedFileItems);
        };
        //uploader.onBeforeUploadItem = function (item) {
        //    console.info('onBeforeUploadItem', item);
        //};
        uploader.onProgressItem = function (fileItem, progress) {
            console.info('onProgressItem', fileItem, progress);
        };
        uploader.onProgressAll = function (progress) {
            console.info('onProgressAll', progress);
        };
        //uploader.onSuccessItem = function (fileItem, response, status, headers) {
        //    console.info('onSuccessItem', fileItem, response, status, headers);
        //};
        //uploader.onErrorItem = function (fileItem, response, status, headers) {
        //    console.info('onErrorItem', fileItem, response, status, headers);
        //};
        uploader.onCancelItem = function (fileItem, response, status, headers) {
            console.info('onCancelItem', fileItem, response, status, headers);
        };
        //uploader.onCompleteItem = function (fileItem, response, status, headers) {
        //    console.info('onCompleteItem', fileItem, response, status, headers);
        //};
        //uploader.onCompleteAll = function () {
        //    console.info('onCompleteAll');
        //};

}])
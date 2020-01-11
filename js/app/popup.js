myApp.service('pageInfoService', function($http) {
    this.getInfo = function(callback) {
        var model = {};

        chrome.tabs.query({'active': true},
        function (tabs) {
            if (tabs.length > 0)
            {
                model.title = tabs[0].title;
                model.url = tabs[0].url;

                chrome.tabs.sendMessage(tabs[0].id, { 'action': 'PageInfo' }, function (response) {
                    model.pageInfos = response;
                    callback(model);
                });
            }

        });
    };


    this.getUserTrips = function (callback, userId) {
        $http.get('http://localhost:9000/user-trips/' + userId).
        then(function(response) {
           callback(response.data);
        });
    };
});

myApp.controller("PageController", function ($http, $scope, pageInfoService) {

    var userId = 1;
    $scope.trips = [];
    $scope.tripPlaces = [];
    $scope.buckets = [];
    $scope.bucketItems = [];

    pageInfoService.getUserTrips(function (userTrips) {
        $scope.trips = userTrips.trips;
        $scope.tripPlaces = userTrips.tripPlaces;
        $scope.buckets = userTrips.buckets;
        $scope.bucketItems = userTrips.bucketItems;
        if(!$scope.$$phase) {
            $scope.$apply();
        }
    }, userId);

    pageInfoService.getInfo(function (info) {
        $scope.title = info.title;
        $scope.url = info.url;
        $scope.pageInfos = info.pageInfos;
        
        $scope.$apply();
    });
});




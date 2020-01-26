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
        $http.get('http://localhost:9000/user-trips/' + userId)
            .then(function(response) {
                callback(response.data);
            });
    };
});

myApp.controller("PageController", function ($scope, pageInfoService, $http) {
    $scope.message = "Hello from AngularJS";
    $scope.flightDetails = {};

    $scope.trips = [];
    $scope.tripPlaces = [];
    $scope.buckets = [];
    $scope.bucketItems = [];

    pageInfoService.getInfo(function (info) {
        $scope.title = info.title;
        $scope.url = info.url;
        $scope.pageInfos = info.pageInfos;
    });

    $scope.scrapeFlightInfo = function () {
        getFlightHubFlightDetails($scope.url);
    };

    $scope.userTrips = function (userId) {
        getUserTrips(userId);
    };

    function getUserTrips(userId) {
        $http({
            method: 'GET',
            url: 'http://localhost:9000/user-trips/' + userId
        }).then(function mySuccess (response) {
            console.log(response.data);
            var userTrips = response.data;
            $scope.trips = userTrips.trips;
            $scope.tripPlaces = userTrips.tripPlaces;
            $scope.buckets = userTrips.buckets;
            $scope.bucketItems = userTrips.bucketItems;
            $scope.$apply();
        }, function myError (response) {
            console.log(response.statusText)
        });
    }

    function getFlightHubFlightDetails(url) {
        var encodedUrl =  encodeURIComponent(url);
        $http({
            method: 'GET',
            url: 'http://localhost:9000/flight-hub/'+ encodedUrl
        }).then(function mySuccess (response) {
            console.log(response.data);
            $scope.flightDetails = response.data;
            $scope.$apply();
        }, function myError (response) {
            console.log(response.statusText)
        });
    }
});

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


    this.getFlightHub = function (callback, url) {
        $http.get('http://localhost:9000/flight-hub/' + encodeURI(url))
            .then(function (response) {
              callback(response.data);
            });
    };
});

myApp.controller("PageController", function ($http, $scope, pageInfoService) {

    var userId = 1;
    var pageController = this;
    pageController.trips = [];
    pageController.tripPlaces = [];
    pageController.buckets = [];
    pageController.bucketItems = [];

    pageInfoService.getUserTrips(function (userTrips) {
        pageController.trips = userTrips.trips;
        pageController.tripPlaces = userTrips.tripPlaces;
        pageController.buckets = userTrips.buckets;
        pageController.bucketItems = userTrips.bucketItems;
        if(!pageController.$$phase) {
            pageController.$apply();
        }
    }, userId);

    pageInfoService.getInfo(function (info) {
        pageController.title = info.title;
        pageController.url = info.url;
        pageController.pageInfos = info.pageInfos;
        console.log(pageController.url);
        // pageController.$apply();
    });

    pageController.parseFlightDetailsFromFlightHub = pageInfoService.getFlightHub(function (flightDetails) {
        console.log(flightDetails);
        pageController.flightDetails = flightDetails;
    }, pageController.url)


});




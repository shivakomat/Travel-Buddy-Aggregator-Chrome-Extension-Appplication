myApp.controller('tripsController', function($http, $window) {
    var tripController = this;

    tripController.userTrips = [];
    tripController.trip = {};
    tripController.tripPlaces = [];
    tripController.flightItems = [];
    tripController.stayItems = [];
    tripController.foodPlaceItems = [];
    tripController.placesToVisit = [];

    getAllUsersTrips(1);

    tripController.getUsersTripFoodPlaceItems = function (userId, tripId) {
        getFoodPlaces(userId, tripId);
    };

    tripController.getUserTripPlacesToVisitItems = function (userId, tripId) {
        getPlacesToVisit(userId, tripId);
    };

    tripController.getUsersTripStayItems = function (userId, tripId) {
        getStayItems(userId, tripId);
    };

    tripController.getUserTripFlightItems = function (userId, tripId) {
        getFlightItems(userId, tripId);
    };

    tripController.getUserTrips = function (userId) {
        getAllUsersTrips(userId);
    };

    tripController.newTrip = function (userId) {
        createATrip(userId);
    };

    tripController.getTripBy = function (userId, tripId) {
        getUserTripByUserIdAndTripId(userId, tripId);
    };

    tripController.getTripPlacesBy = function (userId, tripId) {
        getAllUserTripPlaces(userId, tripId);
    };

    tripController.newFoodPlaceItem = function (userId, tripId) {
        createAFoodPlaceItem(userId, tripId);
    };

    tripController.newFlightItem = function (userId, tripId) {
        createFlightItem(userId, tripId);
    };

    tripController.newStayItem =  function(userId, tripId) {
        createStayItem(userId, tripId);
    };

    tripController.newPlaceToCheckout = function(userId, tripId) {
        createPlaceToCheckout(userId, tripId);
    };

    var host = "https://localhoust:9000";

    function getUserTripByUserIdAndTripId(userId, tripId) {
        $http({
            method: 'GET',
            url: host + '/user-trips/'+ userId
        }).then(function mySuccess (response) {
            console.log(response.data);
            for (var i = 0; i < response.data.trips.length; i++) {
                if(response.data.trips[i].id === tripId) {
                    tripController.trip  = response.data.trips[i];
                }
            }
        }, function myError (response) {
            console.log(response.statusText)
        });
    }

    function getFlightItems(userId, tripId) {
        $http({
            method: 'GET',
            url: host + '/user-trips/'+ userId
        }).then(function mySuccess (response) {
            console.log(response.data);
            var index = 0;
            for (var i = 0; i < response.data.flightItems.length; i++) {
                if(response.data.flightItems[i].tripId === tripId) {
                    tripController.flightItems[index]  = response.data.flightItems[i];
                    index = index + 1;
                }
            }
            console.log(tripController.flightItems);
        }, function myError (response) {
            console.log(response.statusText)
        });
    }

    function getStayItems(userId, tripId) {
        $http({
            method: 'GET',
            url: '/user-trips/'+ userId
        }).then(function mySuccess (response) {
            console.log(response.data);
            var index = 0;
            for (var i = 0; i < response.data.stayItems.length; i++) {
                if(response.data.stayItems[i].tripId === tripId) {
                    tripController.stayItems[index]  = response.data.stayItems[i];
                    index = index + 1;
                }
            }
            console.log(tripController.stayItems);
        }, function myError (response) {
            console.log(response.statusText)
        });
    }

    function getFoodPlaces(userId, tripId) {
        $http({
            method: 'GET',
            url: '/user-trips/'+ userId
        }).then(function mySuccess (response) {
            console.log(response.data);
            var index = 0;
            for (var i = 0; i < response.data.foodPlaceItems.length; i++) {
                if(response.data.foodPlaceItems[i].tripId === tripId) {
                    tripController.foodPlaceItems[index]  = response.data.foodPlaceItems[i];
                    index = index + 1;
                }
            }
            console.log(tripController.foodPlaceItems);
        }, function myError (response) {
            console.log(response.statusText)
        });
    }

    function getPlacesToVisit(userId, tripId) {
        $http({
            method: 'GET',
            url: '/user-trips/'+ userId
        }).then(function mySuccess (response) {
            console.log(response.data);
            var index = 0;
            for (var i = 0; i < response.data.placesToVisit.length; i++) {
                if(response.data.placesToVisit[i].tripId === tripId) {
                    tripController.placesToVisit[index]  = response.data.placesToVisit[i];
                    index = index + 1;
                }
            }
            console.log(tripController.placesToVisit);
        }, function myError (response) {
            console.log(response.statusText)
        });
    }

    function getAllUserTripPlaces(userId, tripId) {
        console.log("Inside gell all user trip places");
        $http({
            method: 'GET',
            url: host + '/user-trips/'+ userId
        }).then(function mySuccess (response) {
            console.log(response.data);
            var index = 0;
            for (var i = 0; i < response.data.tripPlaces.length; i++) {
                if(response.data.tripPlaces[i].tripId === tripId) {
                    tripController.tripPlaces[index]  = response.data.tripPlaces[i];
                    index = index + 1;
                }
            }
            console.log(tripController.tripPlaces);
        }, function myError (response) {
            console.log(response.statusText)
        });
    }

    function getAllUsersTrips (userId) {
        $http({
            method: 'GET',
            url: host + '/user-trips/'+ userId
        }).then(function mySuccess (response) {
            console.log(response.data);
            tripController.userTrips = response.data.trips;
        }, function myError (response) {
            console.log(response.statusText)
        });
    }

    function createATrip(userId) {
        tripController.formData.userId = userId;
        console.log(tripController.formData);
        $http({
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            url: host + '/trips',
            data: JSON.stringify(tripController.formData),
        }).then(function mySuccess() {
            console.log("successfully created");
            $window.location.href = "http://" + $window.location.host + "/profile-page"
        }, function myError() {
            console.log("ERROR creating a trip");
        })
    }

    function createPlaceToCheckout(userId, tripId) {
        tripController.formData.userId = userId;
        tripController.formData.tripId = tripId;
        tripController.formData.tripPlaceId = Number(tripController.formData.tripPlaceId);
        console.log(tripController.formData);
        $http({
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            url: '/places-to-visit-items',
            data: JSON.stringify(tripController.formData),
        }).then(function mySuccess() {
            console.log("successfully created");
            $window.location.href = "http://" + $window.location.host + "/places-to-visit-items-page/" + tripId
        }, function myError() {
            console.log("ERROR creating a stay item");
        })
    }



    function createStayItem(userId, tripId) {
        tripController.formData.userId = userId;
        tripController.formData.tripId = tripId;
        tripController.formData.tripPlaceId = Number(tripController.formData.tripPlaceId);
        console.log(tripController.formData);
        $http({
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            url: '/stay-items',
            data: JSON.stringify(tripController.formData),
        }).then(function mySuccess() {
            console.log("successfully created");
            $window.location.href = "http://" + $window.location.host + "/stay-items-page/" + tripId
        }, function myError() {
            console.log("ERROR creating a stay item");
        })
    }

    function createFlightItem(userId, tripId) {
        tripController.formData.userId = userId;
        tripController.formData.tripId = tripId;
        console.log(tripController.formData);
        $http({
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            url: '/flight-items',
            data: JSON.stringify(tripController.formData),
        }).then(function mySuccess() {
            console.log("successfully created");
            $window.location.href = "http://" + $window.location.host + "/flight-items-page/" + tripId
        }, function myError() {
            console.log("ERROR creating a flight item");
        })
    }


    function createAFoodPlaceItem(userId, tripId) {
        tripController.formData.userId = userId;
        tripController.formData.tripId = tripId;
        tripController.formData.tripPlaceId = Number(tripController.formData.tripPlaceId);
        console.log(tripController.formData);
        $http({
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            url: '/food-place-items',
            data: JSON.stringify(tripController.formData),
        }).then(function mySuccess() {
            console.log("successfully created");
            $window.location.href = "http://" + $window.location.host + "/food-place-items-page/" + tripId
        }, function myError() {
            console.log("ERROR creating a food place item");
        })
    }
});

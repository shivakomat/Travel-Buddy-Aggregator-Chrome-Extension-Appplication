var app = angular.module('travelBuddyChromeExtensionApp', []);


app.controller('UserBucketController', function($scope) {
    $scope.buckets = [{name: 'morpheus'}, {name: 'neo'}, {name: 'trinity'}];
});
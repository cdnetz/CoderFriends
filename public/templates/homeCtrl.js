var app = angular.module('coderFriends');

app.controller("homeCtrl", function($scope, friendsArray){
	$scope.friends = friendsArray;
})
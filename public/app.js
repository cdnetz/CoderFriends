var app = angular.module('coderFriends', ['ngRoute']);

app.config(function ($routeProvider) {
	$routeProvider
	.when('/home' , {
		templateUrl: 'templates/home.html',
		controller: 'homeCtrl',
		resolve: {
			friendsArray: function(friendService){
				return friendService.getFollowing();
				
			}
		}
	})
	.when('/friend/:github_username', {
		templateUrl: 'templates/friend.html',
		controller: 'firendCtrl'
	})
	.otherwise({
		redirecTo: '/home'
	})
})
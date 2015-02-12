var app = angular.module('coderFriends');

app.service('friendService', function ($http, $q) {
	this.getFollowing = function() {
		var deferred = $q.defer();
		$http({
			method: "GET",
			url: "http://localhost:8002/api/github/following"
		}).then(function(response){
			deferred.resolve(response.data);
		}, function(err){
			deferred.reject(err);
		})
		return deferred.promise;
	}
})
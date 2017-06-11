'use strict';
var app = angular.module('myPropApp');

app.service('loginService' , ['$http' , '$log', function($http, $log) {
	this.doLogin = function(userID , paswrd, cb) {

		$http({
			method: 'POST',
			url: 'http://localhost:8080/prop/login',
			data: 
			{
				"id" : userID,
				"password" : paswrd
			}
		}).then(
		function success(res) {
			$log.log('IN Success Response');
			if (res == null) {

					return 'SORRRRYYYYYYY';
				}
				else if (res.data != null){
					var result = res.data;
					cb(result);
				}
				else {
					 return 'NO RESPONSE FROM SERVICE';
				}
		},
		 function error(res) {
			$log.error('In error response');
			if (res.data == null) {
					return 'No response from server Or Server is down';
				}
				else {
					return res.data;
				}
		}
	);
		
	};
}]);
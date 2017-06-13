'use strict';
var app = angular.module('myPropApp');

app.service('aaService' , ['$http' , '$log', function($http, $log) {
	var getResults = function(text, cb) {
	console.log("This is aa servcie log :  " + text);

		$http({
			method: 'POST',
			url: '/prop/speechtext',
			data: 
			{
				"speech" : text
			}
		}).then(
		function success(res) {
			$log.log('IN Success Response');
			if (res == null) {

					return 'I could find related data';
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
			return 'No response from server Or Server is down';
			// if (res.data == null) {
			// 		return 'No response from server Or Server is down';
			// 	}
			// 	else {
			// 		return res.data;
			// 	}
		}
	);
		
	};

	this.getSpeechResults = function(text, cb) {
	console.log("This is aa servcie log :  " + text);

		$http({
			method: 'POST',
			url: 'http://localhost:5001/prop/getresolvedtext',
			data: 
			{
				"speech" : text
			}
		}).then(
		function success(res) {
			$log.log('IN Success Response');
			if (res == null) {

					return 'I could find related data';
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
			return 'No response from server Or Server is down';
			// if (res.data == null) {
			// 		return 'No response from server Or Server is down';
			// 	}
			// 	else {
			// 		return res.data;
			// 	}
		}
	);
		
	};




}]);
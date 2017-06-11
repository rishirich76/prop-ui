'use strict';
var app = angular.module('myPropApp');

app.controller('LoginCtrl',['$scope','$log' , 'loginService' , function($scope, $log, login) {
	$scope.submit = function() {
		var successLoginText = 'You logged in successfully ';
		var errorLoginText = 'Please enter correct creadentials';
		$log.log('In controller');
		var usr = $scope.userId;
		var password = $scope.pswrd;
		console.log('IN Login controller');
		if (usr != undefined && usr != '' && password != undefined && password != '') {
		var respons = login.doLogin(usr, password, function cb(res) {
			if (res.name != undefined && res.name != '') {
				$scope.loginStatus = successLoginText + res.name;
			}
			else {
				$scope.loginStatus = errorLoginText;
			}
			
		});	
$log.log(respons);
		// $scope.loginStatus 
		}
		else {
			$scope.loginStatus = 'Please Enter username and password';	
		}
	};
}])
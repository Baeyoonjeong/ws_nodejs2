/**
 * Created by user on 2016-09-19.
 */
var app = angular.module('scopeExApp',[]);
app.controller('ctrl1',['$scope',function($scope) {
    $scope.test = "Good morning~";
}]);
app.controller('ctrl2',['$scope',function($scope) {
    $scope.test = "Good night~";
}]);
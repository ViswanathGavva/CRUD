'use strict';
angular.module('usersApp')
.filter('gender',['$window',function($window){
  return function(text){
    return  (text === 'M') ? 'Male' : 'Female';
  }
}]);

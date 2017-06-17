'use strict';
angular.module('usersApp')
.controller('UserIndexCtrl',['$scope','UserService',function($scope,UserService){
  //local variables
  var _show_errors = false;

  //models
  $scope.totalUsers= null;
  $scope.erros = [];
  //helpers
  var handleError= function(error){
    $scope.erros.push(error);
    if(_show_errors){
      console.error(error);
    }
  }

  UserService.getAllUsers()
  .then(function(users_list){
    $scope.totalUsers = angular.copy(users_list);
  })
  .catch(function(err){
    handleError(err);
  });
}]);

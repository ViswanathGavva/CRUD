'use strict';
angular.module('usersApp')
  .controller('UserCtrl',['$scope','$window','$stateParams','$state','$q','UserService','filterFilter',function($scope,$window,$stateParams,$state,$q,userService,filterFilter){
    //local variables
    var _show_errors = false;

    //models
    $scope.users= null;
    $scope.sel_user = {"gender":"M"};
    $scope.action = 'Add';
    $scope.erros =[];

    //pagination
    $scope.totalItems = 0;
    $scope.currentPage = 1;
    $scope.itemsPerPage = 10;
    $scope.maxSize =5;

    //state params
    $scope.sel_user_id = $stateParams.user_id;
    $scope.search_str = ($stateParams.search_str) ? $stateParams.search_str : '';

    $scope.filteredUsers = null;
    $scope.totalUsers = null;

    //helpers
    var handleError = function(error){
      $scope.erros.push(error);
      if(_show_errors){
        console.error(error);
      }
    };
    var getToday = function(){
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth()+1;
      var yyyy = today.getFullYear();
       if(dd<10){
              dd='0'+dd
          }
          if(mm<10){
              mm='0'+mm
          }

      today = yyyy+'-'+mm+'-'+dd;
      return today;
    };
    $scope.today = getToday();

    //list users method
    userService.getAllUsers()
      .then(function(users_list){
        $scope.totalUsers = angular.copy(users_list);
        $scope.totalItems = users_list.length;
        if($scope.search_str)
         $scope.filteredUsers = filterFilter($scope.totalUsers,$scope.search_str);
        $scope.$watch('currentPage + itemsPerPage + totalItems',function(newVal,oldVal){
          var begin = (($scope.currentPage -1)*$scope.itemsPerPage);
          var end = begin + $scope.itemsPerPage;
          if($scope.filteredUsers){
            $scope.users = $scope.filteredUsers.slice(begin,end);
          }else{
            $scope.users = users_list.slice(begin,end);
          }
        });
      })
      .catch(function(err){
        handleError(err);
      });

    //edit user method
    var getUser = function(user_id){
      if(!angular.isUndefined(user_id) && user_id !==null && user_id !==''){
         return userService.getUserById(user_id);
      }else{
        var defer = $q.defer();
        defer.reject('user id can not be null');
        return defer.promise.then(angular.noop,function(reason){
          return $q.reject(reason);
        });
      }
    }

    if(!angular.isUndefined($scope.sel_user_id) && $scope.sel_user_id !==null && $scope.sel_user_id !==''){
      $scope.action ='Update';
      getUser($scope.sel_user_id)
        .then(function(user){
          $scope.sel_user = angular.copy(user);
          $scope.sel_user.dob = new Date($scope.sel_user.dob);

        })
        .catch(function(err){
          handleError(err);
        });
    }

    //save user method
    $scope.saveUser = function(){
      $scope.sel_user.dob = new Date($scope.sel_user.dob);
      userService.saveUser($scope.sel_user)
        .then(function(succeess){
          $state.go('view_all_users');
        })
        .catch(function(save_err){
          handleError(save_err);
        });
    }

    $scope.deleteUser = function(del_id){
      if($window.confirm('Are you sure, you want to delete this user?')){
        userService.deleteUser(del_id)
        .then(function(success){
          $state.go('view_all_users',{'search_str':$scope.search_str},{reload:true});
        })
        .catch(function(del_err){
          handleError(del_err);
        });
      }
    }

    $scope.resetForm = function(){

    }

    $scope.$watch('search_str',function(newVal,oldVal){
      if($scope.totalUsers){
        $scope.filteredUsers = (newVal === '') ? $scope.totalUsers : filterFilter($scope.totalUsers,newVal);
        $scope.totalItems = $scope.filteredUsers.length;
        $scope.currentPage =1;
      }
    });



  }]);

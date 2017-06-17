'use strict';

angular.module('usersApp',['ui.router','ui.bootstrap'])
  .config(['$stateProvider','$urlRouterProvider','$locationProvider',function($stateProvider,$urlRouterProvider,$locationProvider){
    //Turn on or off HTML5 mode
    $locationProvider.html5Mode(true);//.hasPrefix('!');
    //routes start
    $stateProvider
    .state('view_all_users',{
      url:'/userlist',
      templateUrl:'views/users/users.html',
      params: {
        search_str : ''
      },
      controller:'UserCtrl'
    })
    .state('add_user',{
      url:'/user',
      templateUrl:'views/users/user_form.html',
      controller:'UserCtrl'
    })
    .state('edit_user',{
      url:'/user/:user_id',
      templateUrl:'views/users/user_form.html',
      controller:'UserCtrl'
    })
    .state('users_index',{
      url:'/userindex',
      templateUrl:'views/users/user_index.html',
      controller:'UserIndexCtrl'
    });

    //default route
    $urlRouterProvider.otherwise(function($injector){
      var $state=$injector.get('$state');
      $state.go('view_all_users');
    });

  }]);

'use strict';
angular.module('usersApp')
	.factory('UserService',['$http','$log','$q',function($http,$log,$q){
		//local variables.

		//Return functions as apis.
		return {
			getAllUsers:getAllUsers,
			getUserById:getUserById,
			saveUser:saveUser,
			deleteUser:deleteUser
		};


		//Implementation of the above API functions.
		function getAllUsers(){
			return $http.get('/users').then(handleSuccess,handleError);
		}

		function getUserById(id){
			return $http.get('/users/'+id).then(handleSuccess,handleError);
		}

		function saveUser(user){
			if(user.id)			{
				return $http.put('/users/'+user.id,user).then(handleSuccess,handleError);
			}
			else{
				return $http.post('/users/',user).then(handleSuccess,handleError);
			}

		}

		function deleteUser(id){
			console.log(id);
			return $http.delete('/users/'+id).then(handleSuccess,handleError);
		}

		//Private metods to handle success and error of xhr calls.

		function handleSuccess(response){
			return response.data;
		}

		function handleError(response){
			 if (! angular.isObject( response.data ) || ! response.data.message) {
                    return( $q.reject( "An unknown error occurred." ) );
            	}
			return( $q.reject( response.data.message ) );
		}

	}]);

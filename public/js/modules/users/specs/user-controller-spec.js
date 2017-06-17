describe('states Controller:onload',function(){

	//Create a instance of user module for each test
	beforeEach(module('usersApp'));

	var ctrl,mockBackend;

	beforeEach(inject(function($controller,$httpBackend,$window,$timeout){
		mockBackend = $httpBackend;

		//mock server call to fetch the data. Respond with some fake data.
		mockBackend.expectGET('/users')
			.respond([{"id":1,"firstname":"Mustafa","lastname":"Wiza viswa","email":"Kuhlman_Martina@hotmail.com","dob":"1985-06-02T00:00:00.000Z","age":32,"gender":"F"},
      {"id":2,"firstname":"German","lastname":"Roob","email":"Jacobi_Jed@yahoo.com","dob":"1973-03-14T00:00:00.000Z","age":44,"gender":"M"},
      {"id":3,"firstname":"Leilani","lastname":"Simonis","email":"Delaney_Waelchi@Gusikowski.me","dob":"1985-12-11","age":63,"gender":"F"}]);

		ctrl = $controller('UserCtrl');
	}));



	//on load tests.
	it('the action should be equal to - Add', function() {
		mockBackend.flush();
		expect(ctrl.action).toEqual('Add');
	});

	it('users should be loaded on load', function() {
    mockBackend.flush();

		expect(ctrl.users).toEqual([{"id":1,"firstname":"Mustafa","lastname":"Wiza viswa","email":"Kuhlman_Martina@hotmail.com","dob":"1985-06-02T00:00:00.000Z","age":32,"gender":"F"},
    {"id":2,"firstname":"German","lastname":"Roob","email":"Jacobi_Jed@yahoo.com","dob":"1973-03-14T00:00:00.000Z","age":44,"gender":"M"},
    {"id":3,"firstname":"Leilani","lastname":"Simonis","email":"Delaney_Waelchi@Gusikowski.me","dob":"1985-12-11","age":63,"gender":"F"}]);
	});

	afterEach(function() {
	// Ensure that all expects set on the $httpBackend were actually called
	mockBackend.verifyNoOutstandingExpectation();
	// Ensure that all requests to the server have actually responded (using flush())
	mockBackend.verifyNoOutstandingRequest();
	});


});

describe('user controller: on edit',function(){
	//Create a instance of admin module for each test
	beforeEach(module('UsersApp'));

	var ctrl,mockBackend;
	var windowMock,scope,compile,formElem,timeout;


	beforeEach(inject(function($controller,$httpBackend,$compile,$rootScope,$window,$timeout){
		mockBackend = $httpBackend;
		timeout = $timeout;
		//mock server call to fetch the data.
		mockBackend.expectGET('/users/2')
			.respond({"id":1,"firstname":"Mustafa","lastname":"Wiza viswa","email":"Kuhlman_Martina@hotmail.com","dob":"1985-06-02T00:00:00.000Z","age":32,"gender":"F"});

		ctrl = $controller('UserCtrl');

	}));


	//on edit
	it('\n the self.state should be equal to selected state'
		+'\n the action should be equal to - Update',function(){

		//mock server call to fetch the user by ID.simulate server call response.
		mockBackend.flush();

		//the self.sel_user should be equal to selected user
		expect(ctrl.sel_user).toEqual({"id":1,"firstname":"Mustafa","lastname":"Wiza viswa","email":"Kuhlman_Martina@hotmail.com","dob":"1985-06-02T00:00:00.000Z","age":32,"gender":"F"});

		//the action should be equal to - Update
		expect(ctrl.action).toEqual('Update');

	});


	afterEach(function() {
	// Ensure that all expects set on the $httpBackend were actually called
	mockBackend.verifyNoOutstandingExpectation();
	// Ensure that all requests to the server have actually responded (using flush())
	mockBackend.verifyNoOutstandingRequest();
	});


});

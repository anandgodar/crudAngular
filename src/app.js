var angApp = angular.module('angApp', ['ngRoute']);

angApp.config(function($routeProvider){
  $routeProvider

  .when('/new',{
      templateUrl:'partials/add.html',
      controller:'userController'
  })

  .when('/login',{
      templateUrl:'partials/login.html',
      controller:'loginController'
  })

  .when('/edit/:id',{
      templateUrl:'partials/edit.html',
      controller:'userController'
  })

   .when('/',{
      templateUrl:'partials/members.html',
      controller:'userController'
  })


});



angApp.controller('userController',['$rootScope','$scope','$location', 'UserFactory','$routeParams',function($rootScope,$scope,$location,UserFactory,$routeParams){
   
   $scope.save = function(){

      UserFactory.add($scope.person);
      $location.path("/");
    }

  $scope.person= UserFactory.getSingle($routeParams.id); 
  
  $scope.edit = function(){

      UserFactory.edit($scope.person);
      $location.path("/");
    }

    $scope.getAllMembers=function(){
      $scope.members = UserFactory.getAllMembers();
    }

    $scope.delete = function(id){
      UserFactory.delete(id);
      $location.path("/");
    }

    $scope.credentials = {};

    $scope.getAllMembers();
   

}]);

angApp.factory('UserFactory',function(){
  data = [
                  {id:0,firstName:"Anand",lastName:"Godar",age:30},
                  {id:1,firstName:"Amir",lastName:"Bhujel",age:50},
                  {id:2,firstName:"Robin",lastName:"Gurung",age:28},  
   ];
  return {
        getAllMembers:function(){
          return data;
        },
        getSingle:function(id){
          return data[id];
        },
        add:function(person){ 
         
          var currentId = data.length;
          data.push({id:currentId,firstName:person.firstName,lastName:person.lastName,age:person.age});
       
        },
        edit:function(person){
          for (i in data) {
                if (data[i].id == person.id) {
                    data[i] = person;
                }
            }
        },
        delete:function(id){
          for (i in data) {
                if (data[i].id == id) {
                    data.splice(i, 1);
                }
            }
           
        }

  }
});

angApp.directive('userRow', function () {
  template =  '<tr ng-repeat="person in members track by $index"><td>{{person.id}}</td><td>{{person.firstName}}  {{person.lastName}}</td>'+
              '<td><a href="#/edit/{{$index}}">Edit</a> || <button class="btn btn-mini btn-danger"'+
           ' ng-click="delete($index)">Delete</button></td></tr>';
    return {
        template: template
           };
});


/**
 * Created by rohit on 10/4/16.
 */
var loginControllers = angular.module('loginControllers', []);

loginControllers
  .controller('LoginCtrl', ['$scope', '$http', '$location', '$window', function($scope,$http,$location, $window) {
    $scope.username= "";
    $scope.login = function(user) {
      console.log(user);

      $http({
        method: 'POST',
        url: "http://192.168.1.61:3000/users/login",
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        data: user
      }).success(function (data) {
        $window.localStorage.setItem('user', JSON.stringify(data.user));
        $location.path('/profile');
        console.log(data);
      }).error(function(data) {
        console.log(data);
      });
    };
  }]);

loginControllers
  .controller('ProfileCtrl', ['$scope', '$http', '$location', '$window', function($scope,$http,$location, $window) {
    $scope.user= JSON.parse($window.localStorage.getItem('user'));
    $scope.update = function(user) {
      console.log(user);

      $http({
        method: 'POST',
        url: "http://192.168.1.61:3000/users/addDetails",
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        data: user
      }).success(function (data) {
        $window.localStorage.setItem('user', JSON.stringify(data.user));
        $location.path('/merchants');
        console.log(data);
      }).error(function(data) {
        console.log(data);
      });
    };
  }]);


loginControllers
  .controller('CatalogCtrl', function($scope, $ionicModal, $http, $routeParams, $window) {
  var getCatalog = function () {
    var user = JSON.parse($window.localStorage.getItem('user'));
    var data = {
      gender: user.gender,
        occupation: user.occupation,
        age: user.age,
        merchantID: $routeParams.merchantID
    };
    console.log(data);
    $http({
      method: 'POST',
      url: "http://192.168.1.61:3000/recommendations/",
      data: data,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function (data) {
      $scope.catalog = data.finals;
      console.log("success");
    }).error(function(data) {
      console.log("error: " + data);
      $scope.err = true;
    })
  };
    getCatalog();
});

loginControllers
  .controller('MerchantsCtrl', function($scope, $ionicModal, $http, $location, $cordovaGeolocation) {
    $scope.getCatalog = function (id) {
      $location.path('/catalog/' + id);
    };

    $scope.merchants = [{username: "test1", _id: "12"}];
    var getLoc = function() {
      $cordovaGeolocation.getCurrentPosition({maximumAge: 500000, enableHighAccuracy: true})
        .then(function (position) {
          var arr = [];
          arr.push(position.coords.longitude);
          arr.push(position.coords.latitude);
          console.log(arr);
          getMerchants({
            coordinates: arr,
            type: 'Point'
          });
        }, function (err) {

        });
    };
    var getMerchants = function (location) {
      console.log(location);
      $http({
        method: 'POST',
        url: "http://192.168.1.61:3000/admin/listAllMerchant",
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        data: {location: location}
      }).success(function (data) {
        $scope.merchants = data.merchants;
        console.log(data);
      }).error(function (data) {
        console.log(data);
        $scope.err = true;
      });
    };
    getLoc();
  });



/**
 * Created by rohit on 10/4/16.
 */
var loginControllers = angular.module('loginControllers', []);

loginControllers
  .controller('LoginCtrl', ['$scope', '$http', '$location', function($scope,$http,$location) {
    $scope.username= "";
    $scope.login = function(user) {
      console.log(user);

      $http({
        method: 'POST',
        url: "http://localhost:3000/users/login",
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        data: user
      }).success(function (data) {
        window.localStorage.setItem('user', data.user);
        $location.path('/merchants');
        console.log(data);
      }).error(function(data) {
        console.log(data);
      });
    };

  }]);

loginControllers
  .controller('CatalogCtrl', function($scope, $ionicModal, $http, $routeParams) {
  var getCatalog = function () {
    $http({
      method: 'POST',
      url: "http://localhost:3000/recommendations/",
      data: {
        gender: window.localStorage.user.gender,
        occupation: window.localStorage.user.occupation,
        age: window.localStorage.user.age,
        merchantID: $routeParams.merchantID
      },
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function (data) {
      $scope.catalog = data.finals;
    }).error(function(data) {
      console.log(data);
      $scope.err = true;
    })
  };
    getCatalog();
});

loginControllers
  .controller('MerchantsCtrl', function($scope, $ionicModal, $http, $location, $cordovaGeolocation) {
    document.addEventListener("deviceready", function () {
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
    }, false);

    $scope.getCatalog = function (id) {
      $location.path('/catalog/' + id);
    };

    $scope.merchants = [{username: "test1", _id: "12"}];

    getMerchants = function (location) {
      console.log(location);
      $http({
        method: 'POST',
        url: "http://localhost:3000/admin/listAllMerchants",
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        data: location
      }).success(function (data) {
        $scope.merchants = data.Merchant;
        console.log(data);
      }).error(function (data) {
        console.log(data);
        $scope.err = true;
      });
    };
  });



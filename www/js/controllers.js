var loginControllers = angular.module('loginControllers', []);
var loggedin = 0;
loginControllers
.controller('LoginCtrl',['$scope','$http','$location','$window',function($scope,$http,$location, $window){
    $scope.username = "John Doe";
    $scope.login = function(user) {
        console.log(user);

        $http({
        method: 'POST',
        url: "http://localhost:3000/users/login",
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        data: user
        }).success(function (data) {
            console.log(data);
            $window.localStorage.setItem('user', JSON.stringify(data.user));
            loggedin = 1;
            $location.path('/merchants');

            })
        .error(function(data) {
            console.log(data);
        });

    };
}]);

loginControllers
.controller('MerchantCtrl',function($scope, $ionicModal, $http, $location, $cordovaGeolocation) {

    $scope.getCatalog = function (id) {
      $location.path('/catalog/' + id);
    };

    $scope.merchants = [{username: "Test", _id: "1"}];
    var getLoc = function() {
        var posOptions = {timeout: 10000, enableHighAccuracy: false};
        $cordovaGeolocation
        .getCurrentPosition(posOptions)
        .then(function (position) {

          var lat  = position.coords.latitude
          var long = position.coords.longitude
          var arr = [lat,long];

          console.log(arr);

        }, function(err) {
          console.log(err);
        });

    };

    var getMerchants = function(location) {

        $http({
        method: 'POST',
        url: "http://localhost:3000/admin/listAllMerchant",
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        data: {location: location}
        }).success(function (data) {
            console.log(data);
            //$location.path('/merchants');
            })
        .error(function(data) {
            console.log(data);
        });

    };

    if(loggedin == 0) {
        $location.path('/login');
    } else {
        getLoc();
    }


});


loginControllers
.controller('CatalogCtrl',['$scope','$http','$location','$window',function($scope,$http,$location, $window){
    console.log("Logged in");
}]);


loginControllers
.controller('ProductCtrl',['$scope','$http','$location','$window',function($scope,$http,$location, $window){
    console.log("Logged in");
}]);

var loginControllers = angular.module('loginControllers', []);

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
            $location.path('/merchants');
            })
        .error(function(data) {
            console.log(data);
        });

    };
}]);

loginControllers
.controller('MerchantCtrl',['$scope','$http','$location','$window',function($scope,$http,$location, $window,$cordovaGeolocation){
    console.log("Logged in");

    $scope.getCatalog = function (id) {
      $location.path('/catalog/' + id);
    };

    $scope.merchants = [{username: "Test", _id: "1"}];
    var getLoc = function() {
      var arr = [77.038,28.609];
      console.log(arr);
      getMerchants({
            coordinates: arr,
            type: 'Point'
        });

    };

    var getMerchants = function(location) {

        $http({
        method: 'POST',
        url: "http://localhost:3000/admin/listMerchant",
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

    getLoc();

}]);


loginControllers
.controller('CatalogCtrl',['$scope','$http','$location','$window',function($scope,$http,$location, $window){
    console.log("Logged in");
}]);


loginControllers
.controller('ProductCtrl',['$scope','$http','$location','$window',function($scope,$http,$location, $window){
    console.log("Logged in");
}]);

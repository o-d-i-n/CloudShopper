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

    $scope.merchants = [];
    var getLoc = function() {
        var posOptions = {timeout: 10000, enableHighAccuracy: false};
        $cordovaGeolocation
        .getCurrentPosition(posOptions)
        .then(function (position) {

          var lat  = position.coords.latitude
          var long = position.coords.longitude
          var arr = [lat,long];
          getMerchants({type:'Point',coordinates:arr});
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


            $scope.merchants = data.merchants;

            //$location.path('/merchants');
            })
        .error(function(data) {
            console.log(data);
        });

    };


    getLoc();

});


loginControllers
.controller('CatalogCtrl',['$scope','$http','$location','$window','$routeParams',function($scope,$http,$location, $window,$routeParams){

    $scope.products = [];
    var user = JSON.parse($window.localStorage.getItem('user'));
    var datas = {
        gender: 'M',
        occupation: "student",
        age: 18,
        season: 'summer',
        merchantID:$routeParams.merchantID
    };
    //console.log(data);


    $http({
    method: 'POST',
    url: "http://localhost:3000/recommendations",
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    data: datas
    }).success(function (data) {
        console.log(data);
        $scope.products = data.finals;
        })
    .error(function(data) {
        console.log(data);
    });


}]);


loginControllers
.controller('ProductCtrl',['$scope','$http','$location','$window',function($scope,$http,$location, $window){
    console.log("Logged in");
}]);

angular.module('login', ['ionic'])

.controller('LoginCtrl', function($scope, $ionicModal,$http) {

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
            })
        .error(function(data) {
            console.log(data);
        });

    };

});

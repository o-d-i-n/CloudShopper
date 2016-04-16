angular.module('cloudShopper', ['ionic','loginControllers','ngRoute','ngCordova'])

.config(['$routeProvider',function($routeProvider){
        $routeProvider.
        when('/login',{
            templateUrl: 'partials/login.html',
            controller: 'LoginCtrl'
        }).
        when('/merchants',{
            templateUrl: 'partials/merchants.html',
            controller: 'MerchantCtrl'
        }).
        when('/catalog/:merchantID',{
            templateUrl: 'partials/catalog.html',
            controller: 'CatalogCtrl'
        }).
        when('/product/:productID',{
            templateUrl: 'partials/merchants.html',
            controller: 'ProductCtrl'
        }).
        otherwise({
            redirectTo: '/login'
        })
}])

angular.module('login', ['ionic', 'loginControllers', 'ngRoute', 'ngCordova'])

.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    when('/login', {
      templateUrl: 'partials/login.html',
      controller: 'LoginCtrl'
    }).
    when('/profile', {
      templateUrl: 'partials/profile.html',
      controller: 'ProfileCtrl'
    }).
    when('/catalog/:merchantID', {
      templateUrl: 'partials/catalog.html',
      controller: 'CatalogCtrl'
    }).
    when('/product/:productID', {
      templateUrl: 'partials/product.html',
      controller: 'ProductCtrl'
    }).
    when('/merchants', {
      templateUrl: 'partials/merchants.html',
      controller: 'MerchantsCtrl'
    }).
    otherwise({
      redirectTo: '/login'
    });
  }])
  /*.run(function($rootScope, $location) {
    $rootScope.$on( "$locationChangeStart", function(event, next, current) {
      if (window.localStorage.getItem('user').username) {
        console.log(window.localStorage.user.username);
        // no logged user, we should be going to #login
        if ( next.templateUrl == "partials/login.html" ) {
          $location.path('/merchants');
          // already going to #login, no redirect needed
        }
      }
    });
  })*/;

/// <reference path="./_app.ts" />
var app;
(function (app) {
    var controllers;
    (function (controllers) {
        var AppCtrl = (function () {
            function AppCtrl() {
            }
            return AppCtrl;
        })();
        controllers.AppCtrl = AppCtrl;
    })(controllers = app.controllers || (app.controllers = {}));
})(app || (app = {}));
/// <reference path="./_app.ts" />
/**
 * Created by cjcoffey on 3/20/2015.
 */
var app;
(function (app) {
    var services;
    (function (services) {
        'use strict';
        var AppService = (function () {
            function AppService($ionicPlatform, $q) {
                this.$ionicPlatform = $ionicPlatform;
                this.$q = $q;
            }
            return AppService;
        })();
        services.AppService = AppService;
    })(services = app.services || (app.services = {}));
})(app || (app = {}));
/// <reference path="../_app.ts" />
var app;
(function (app) {
    var controllers;
    (function (controllers) {
        var EntertainmentController = (function () {
            function EntertainmentController() {
                this.filter = "";
                this.districts = [
                    '',
                    'Northshore',
                    'Riverfront',
                    'Bluff View',
                    'City Center',
                    'MLK',
                    'Southside'
                ];
                this.theaters = [
                    { 'dist': 'Northshore', 'name': 'Chattanooga Theatre Centre' },
                    { 'dist': 'Riverfront', 'name': 'Rhythm & Brews' },
                    { 'dist': 'Riverfront', 'name': 'Tennessee Aquarium' },
                    { 'dist': 'Bluff View', 'name': 'Tennessee Riverwalk' },
                    { 'dist': 'Bluff View', 'name': 'Hunter Museum of Art' },
                    { 'dist': 'City Center', 'name': 'Tivoli Theare' },
                    { 'dist': 'MLK', 'name': 'JJ\'s Bohemia' },
                    { 'dist': 'MLK', 'name': 'Lindsay Street Hall' },
                    { 'dist': 'Southside', 'name': 'Finley Stadium' },
                    { 'dist': 'Southside', 'name': 'Southside Social' },
                    { 'dist': 'Southside', 'name': 'Track 29' }
                ];
            }
            return EntertainmentController;
        })();
        controllers.EntertainmentController = EntertainmentController;
    })(controllers = app.controllers || (app.controllers = {}));
})(app || (app = {}));
/// <reference path="../_app.ts" />
var app;
(function (app) {
    var controllers;
    (function (controllers) {
        var ShopController = (function () {
            function ShopController() {
                this.shops = [
                    "Trek Bikes",
                    "Salon place",
                    "Whatever"
                ];
            }
            return ShopController;
        })();
        controllers.ShopController = ShopController;
    })(controllers = app.controllers || (app.controllers = {}));
})(app || (app = {}));
/// <reference path="../_app.ts" />
var app;
(function (app) {
    var controllers;
    (function (controllers) {
        var RestaurantController = (function () {
            function RestaurantController() {
                this.restaurants = [
                    "Taco Mamacita",
                    "Whole Foods",
                    "Your mom's"
                ];
            }
            return RestaurantController;
        })();
        controllers.RestaurantController = RestaurantController;
    })(controllers = app.controllers || (app.controllers = {}));
})(app || (app = {}));
/// <reference path="./_app.ts" />
var app;
(function (app) {
    var AppConfig = (function () {
        function AppConfig() {
            this.isMockMode = true;
            this.isDeveloperMode = false;
            this.systemTimerInSec = 21;
            this.serviceTimerInSeconds = 60 * 5;
            this.screenLockTimeoutInMin = 20; //20 minutes
            this.events = {
                serviceTick: 'service-tick',
                uiTick: 'ui-tick'
            };
            this.const = {};
        }
        Object.defineProperty(AppConfig.prototype, "refreshMinsRealtimeMeterdata", {
            get: function () {
                return 1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppConfig.prototype, "refreshMinsDailyMeterdata", {
            get: function () {
                return 720;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppConfig.prototype, "isDevice", {
            get: function () {
                return !!window.cordova;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppConfig.prototype, "hoursToShowInChart", {
            get: function () {
                return 6;
            },
            enumerable: true,
            configurable: true
        });
        return AppConfig;
    })();
    app.AppConfig = AppConfig;
    var config = new AppConfig();
    'use strict';
    angular.module('starter', ['ionic', 'ngCordova']).value('config', config).constant('_', _).service("appService", app.services.AppService).controller("AppCtrl", app.controllers.AppCtrl).controller("EntertainmentController", app.controllers.EntertainmentController).controller("ShopController", app.controllers.ShopController).controller("RestaurantController", app.controllers.RestaurantController).run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                window.StatusBar.styleDefault();
            }
        });
    }).config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider.state('app', {
            url: "/app",
            abstract: true,
            templateUrl: "app/menu.html",
            controller: 'AppCtrl'
        }).state('app.entertainment', {
            url: "/entertainment",
            views: {
                'menuContent': {
                    templateUrl: "app/entertainment/entertainment.html",
                    controller: 'EntertainmentController',
                    controllerAs: 'ctrl'
                }
            }
        }).state('app.shops', {
            url: "/shops",
            views: {
                'menuContent': {
                    templateUrl: "app/shop/shop.html",
                    controller: 'ShopController',
                    controllerAs: 'ctrl'
                }
            }
        }).state('app.restaurants', {
            url: "/restaurant",
            views: {
                'menuContent': {
                    templateUrl: "app/restaurant/restaurant.html",
                    controller: 'RestaurantController',
                    controllerAs: 'ctrl'
                }
            }
        });
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/entertainment');
    });
})(app || (app = {}));
/// <reference path="./typings/tsd.d.ts" />
/// place new references here
/// <reference path="./app-controller.ts" />
/// <reference path="./app-service.ts" />
/// <reference path="./entertainment/entertainment-controller.ts" />
/// <reference path="./shop/shop-controller.ts" />
/// <reference path="./restaurant/restaurant-controller.ts" />
/// <reference path="./app.ts" />
//# sourceMappingURL=app.js.map
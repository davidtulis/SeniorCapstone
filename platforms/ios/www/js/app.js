/**
 * Created by john on 9/11/15.
 */
/// <reference path="../_app.ts" />
var app;
(function (app) {
    var services;
    (function (services) {
        'use strict';
        var LocationService = (function () {
            function LocationService($q, $http) {
                this.$q = $q;
                this.$http = $http;
                this.districts = [];
                this.locationTypes = [];
                this.apiEndpoint = 'http://www.downtownchattanooga.org/feeds/mapdata.json.html';
                this.districts.push({ id: 0, name: 'Bluff View', locations: [] });
                this.districts.push({ id: 1, name: 'City Center', locations: [] });
                this.districts.push({ id: 2, name: 'MLK/UTC', locations: [] });
                this.districts.push({ id: 3, name: 'Northshore', locations: [] });
                this.districts.push({ id: 4, name: 'Riverfront', locations: [] });
                this.districts.push({ id: 5, name: 'Southside', locations: [] });
                // this.districts.push({ id: 6, name: '', locations: [] });
                this.locationTypes.push({ id: 0, name: 'Entertainment', locations: [] });
                this.locationTypes.push({ id: 1, name: 'Restaurant', locations: [] });
                this.locationTypes.push({ id: 2, name: 'Shop', locations: [] });
                this.locationTypes.push({ id: 3, name: '', locations: [] });
            }
            LocationService.prototype.getByDistrict = function (districtId) {
                var _this = this;
                var deferred = this.$q.defer();
                this.loadData().then(function () {
                    deferred.resolve(_this.districts[districtId].locations);
                });
                return deferred.promise;
            };
            LocationService.prototype.getById = function (locationId) {
                var deferred = this.$q.defer();
                var result;
                this.loadData().then(function (locations) {
                    _.forEach(locations, function (location) {
                        if (location.id === locationId) {
                            result = location;
                        }
                    });
                    deferred.resolve(result);
                });
                return deferred.promise;
            };
            LocationService.prototype.getByLocationType = function (locationTypeId) {
                var _this = this;
                var deferred = this.$q.defer();
                this.loadData().then(function () {
                    deferred.resolve(_this.locationTypes[locationTypeId].locations);
                });
                return deferred.promise;
            };
            LocationService.prototype.getDistrict = function (districtId) {
                var _this = this;
                var deferred = this.$q.defer();
                this.loadData().then(function () {
                    deferred.resolve(_this.districts[districtId]);
                });
                return deferred.promise;
            };
            LocationService.prototype.getDistricts = function () {
                var _this = this;
                var deferred = this.$q.defer();
                this.loadData().then(function () {
                    deferred.resolve(_this.districts);
                });
                return deferred.promise;
            };
            LocationService.prototype.getLocationType = function (locationTypeId) {
                var _this = this;
                var deferred = this.$q.defer();
                this.loadData().then(function () {
                    deferred.resolve(_this.locationTypes[locationTypeId]);
                });
                return deferred.promise;
            };
            LocationService.prototype.getLocationTypes = function () {
                var _this = this;
                var deferred = this.$q.defer();
                this.loadData().then(function () {
                    deferred.resolve(_this.locationTypes);
                });
                return deferred.promise;
            };
            LocationService.prototype.loadData = function () {
                var _this = this;
                var deferred = this.$q.defer();
                var locations = [];
                var config = {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.85 Safari/537.36'
                    }
                };
                this.$http.get(this.apiEndpoint, config).then(function (response) {
                    _.forEach(_this.districts, function (district) {
                        district.locations = [];
                    });
                    _.forEach(_this.locationTypes, function (locationType) {
                        locationType.locations = [];
                    });
                    var json = JSON.parse(response.data.slice(15, response.data.length - 2));
                    _.forEach(json['items'], function (item) {
                        var location = new app.models.Location();
                        location.address1 = item['address1'];
                        location.address2 = item['address2'];
                        location.city = item['city'];
                        location.description = JSON.parse('"' + item['description'] + '"');
                        location.id = item['itemid'];
                        location.latitude = item['latitude'];
                        location.longitude = item['longitude'];
                        location.name = JSON.parse('"' + item['Title'] + '"');
                        location.state = item['state'];
                        location.website = item['External Link'];
                        location.zipCode = item['zipcode'];
                        _.forEach(_this.districts, function (district) {
                            if (district.name === item['Subtitle']) {
                                location.district = district;
                                district.locations.push(location);
                            }
                        });
                        switch (item['url'].split('/')[2].split('-')[0]) {
                            case 'arts':
                                location.locationType = _this.locationTypes[0];
                                _this.locationTypes[0].locations.push(location);
                                break;
                            case 'food':
                                location.locationType = _this.locationTypes[1];
                                _this.locationTypes[1].locations.push(location);
                                break;
                            case 'shopping':
                                location.locationType = _this.locationTypes[2];
                                _this.locationTypes[2].locations.push(location);
                                break;
                            case 'retail':
                                location.locationType = _this.locationTypes[2];
                                _this.locationTypes[2].locations.push(location);
                                break;
                            default:
                                location.locationType = _this.locationTypes[3];
                                _this.locationTypes[3].locations.push(location);
                        }
                        locations.push(location);
                    });
                    deferred.resolve(locations);
                });
                return deferred.promise;
            };
            return LocationService;
        })();
        services.LocationService = LocationService;
    })(services = app.services || (app.services = {}));
})(app || (app = {}));
/// <reference path="./_app.ts" />
var app;
(function (app) {
    var controllers;
    (function (controllers) {
        var AppController = (function () {
            function AppController() {
            }
            return AppController;
        })();
        controllers.AppController = AppController;
    })(controllers = app.controllers || (app.controllers = {}));
})(app || (app = {}));
/**
 * Created by john on 9/11/15.
 */
/// <reference path="../../_app.ts" />
var app;
(function (app) {
    var controllers;
    (function (controllers) {
        'use strict';
        var LocationsListController = (function () {
            function LocationsListController(LocationService, $state) {
                var _this = this;
                this.LocationService = LocationService;
                this.$state = $state;
                LocationService.getLocationType($state.params['locationTypeId']).then(function (data) {
                    _this.locationType = data;
                    _this.locations = data.locations;
                });
                LocationService.getDistricts().then(function (data) {
                    _this.districts = data;
                });
            }
            return LocationsListController;
        })();
        controllers.LocationsListController = LocationsListController;
    })(controllers = app.controllers || (app.controllers = {}));
})(app || (app = {}));
/**
 * Created by john on 9/8/15.
 */
/// <reference path="../_app.ts" />
var app;
(function (app) {
    var models;
    (function (models) {
        'use strict';
        var District = (function () {
            function District() {
            }
            return District;
        })();
        models.District = District;
    })(models = app.models || (app.models = {}));
})(app || (app = {}));
/**
 * Created by john on 9/11/15.
 */
/// <reference path="../_app.ts" />
var app;
(function (app) {
    var models;
    (function (models) {
        'use strict';
        var Location = (function () {
            function Location() {
            }
            return Location;
        })();
        models.Location = Location;
    })(models = app.models || (app.models = {}));
})(app || (app = {}));
/**
 * Created by john on 9/11/15.
 */
/// <reference path="../_app.ts" />
var app;
(function (app) {
    var models;
    (function (models) {
        'use strict';
        var LocationType = (function () {
            function LocationType() {
            }
            return LocationType;
        })();
        models.LocationType = LocationType;
    })(models = app.models || (app.models = {}));
})(app || (app = {}));
/// <reference path="./_app.ts" />
var app;
(function (app) {
    'use strict';
    var ngApp = angular.module('starter', ['ionic', 'ngCordova']);
    // Services
    ngApp.service('LocationService', app.services.LocationService);
    // Controllers
    ngApp.controller("AppController", app.controllers.AppController);
    ngApp.controller("LocationsListController", app.controllers.LocationsListController);
    ngApp.run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window["StatusBar"]) {
                window["StatusBar"].styleDefault();
            }
        });
    });
    ngApp.config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider.state('app', {
            url: "/app",
            abstract: true,
            templateUrl: "app/menu.html",
            controller: 'AppController',
            controllerAs: 'ctrl'
        });
        $stateProvider.state('app.entertainment', {
            url: "/entertainment",
            params: {
                locationTypeId: 0
            },
            views: {
                'menuContent': {
                    templateUrl: "app/locations/locations-list/locations-list.html",
                    controller: 'LocationsListController',
                    controllerAs: 'ctrl'
                }
            }
        });
        $stateProvider.state('app.restaurants', {
            url: "/restaurant",
            params: {
                locationTypeId: 1
            },
            views: {
                'menuContent': {
                    templateUrl: "app/locations/locations-list/locations-list.html",
                    controller: 'LocationsListController',
                    controllerAs: 'ctrl'
                }
            }
        });
        $stateProvider.state('app.shops', {
            url: "/shops",
            params: {
                locationTypeId: 2
            },
            views: {
                'menuContent': {
                    templateUrl: "app/locations/locations-list/locations-list.html",
                    controller: 'LocationsListController',
                    controllerAs: 'ctrl'
                }
            }
        });
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/entertainment');
    });
})(app || (app = {}));
/// <reference path="./typings/tsd.d.ts" />
/// Services
/// <reference path="./locations/location-service.ts" />
/// Controllers
/// <reference path="./app-controller.ts" />
/// <reference path="./locations/locations-list/locations-list-controller.ts" />
/// Models
/// <reference path="./models/district.ts" />
/// <reference path="./models/location.ts" />
/// <reference path="./models/location-type.ts" />
/// <reference path="./app.ts" />
//# sourceMappingURL=app.js.map
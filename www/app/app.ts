/// <reference path="./_app.ts" />

module app {
    'use strict';

    var ngApp = angular.module('starter', ['ionic','ngCordova', 'uiGmapgoogle-maps']);

    // Services
    ngApp.service('LocationService', services.LocationService);

    // Controllers
    ngApp.controller("AppController", controllers.AppController);
    ngApp.controller("LocationsListController", controllers.LocationsListController);
    ngApp.controller("LocationDetailsController", controllers.LocationDetailsController);

    ngApp.run(function($ionicPlatform) {

        $ionicPlatform.ready(function() {

            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if(window.cordova && window.cordova.plugins.Keyboard) {

                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
                cordova.plugins.Keyboard.disableScroll(true);
            }

            if(window["StatusBar"]) {

                window["StatusBar"].styleDefault();
            }
        });
    });

    ngApp.config(function($stateProvider, $urlRouterProvider) {
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
        })
        
        $stateProvider.state('app.details', {
            url: "/details/:id",
            views: {
                'menuContent': {
                    templateUrl: "app/locations/location-detail/location-detail.html",
                    controller: 'LocationDetailsController',
                    controllerAs: 'ctrl'
                }
            }
        });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/entertainment');
    });
}

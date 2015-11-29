/// <reference path="./_app.ts" />

module app {
    'use strict';

    var ngApp = angular.module('starter', ['ionic','ngCordova']);

    // Services
    ngApp.service('LocationService', services.LocationService);

    // Controllers
    ngApp.controller("AppController", controllers.AppController);
    ngApp.controller("HomeController", controllers.HomeController);
    ngApp.controller("LocationListController", controllers.LocationListController);
    ngApp.controller("LocationDetailsController", controllers.LocationDetailsController);
    ngApp.controller("MapController", controllers.MapController);

    ngApp.run(($ionicPlatform) => {

        $ionicPlatform.ready(() => {

            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if(window['cordova'] && window.cordova['plugins'] && window.cordova.plugins['Keyboard']) {

                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
                cordova.plugins.Keyboard.disableScroll(true);
            }

            if(window["StatusBar"]) {

                window["StatusBar"].styleDefault();
                window["StatusBar"].overlaysWebView(false);
            }
        });

        document.addEventListener("deviceready", () => {
            window.open = cordova["InAppBrowser"]["open"];
        }, false);
    });

    ngApp.config(($stateProvider: ng.ui.IStateProvider,
                          $urlRouterProvider: ng.ui.IUrlRouterProvider, 
                          $ionicConfigProvider) => {
        
        $ionicConfigProvider.backButton.text('').icon('ion-chevron-left').previousTitleText(false);
        
        $stateProvider.state('app', {
            url: "/app",
            abstract: true,
            templateUrl: "app/menu.html",
            controller: 'AppController',
            controllerAs: 'ctrl'
        });
        
        $stateProvider.state('home', {
            url: "/home",
            templateUrl: "app/home/home.html",
            controller: 'HomeController',
            controllerAs: 'ctrl'
        });
        
        $stateProvider.state('app.bluffview', {
            url: "/bluffview",
            params: {
                district: models.District.BLUFF_VIEW
            },
            views: {
                'menuContent': {
                    templateUrl: "app/locations/locations-list/locations-list.html",
                    controller: 'LocationListController',
                    controllerAs: 'ctrl'
                }
            }
        });
        
        $stateProvider.state('app.citycenter', {
            url: "/citycenter",
            params: {
                district: models.District.CITY_CENTER
            },
            views: {
                'menuContent': {
                    templateUrl: "app/locations/locations-list/locations-list.html",
                    controller: 'LocationListController',
                    controllerAs: 'ctrl'
                }
            }
        });
        
        $stateProvider.state('app.northshore', {
            url: "/northshore",
            params: {
                district: models.District.NORTHSHORE
            },
            views: {
                'menuContent': {
                    templateUrl: "app/locations/locations-list/locations-list.html",
                    controller: 'LocationListController',
                    controllerAs: 'ctrl'
                }
            }
        });
        
        $stateProvider.state('app.riverfront', {
            url: "/riverfront",
            params: {
                district: models.District.RIVERFRONT
            },
            views: {
                'menuContent': {
                    templateUrl: "app/locations/locations-list/locations-list.html",
                    controller: 'LocationListController',
                    controllerAs: 'ctrl'
                }
            }
        });
        
        $stateProvider.state('app.southside', {
            url: "/southside",
            params: {
                district: models.District.SOUTHSIDE
            },
            views: {
                'menuContent': {
                    templateUrl: "app/locations/locations-list/locations-list.html",
                    controller: 'LocationListController',
                    controllerAs: 'ctrl'
                }
            }
        });
        
        $stateProvider.state('app.utcmlk', {
            url: "/utcmlk",
            params: {
                district: models.District.UTC_MLK
            },
            views: {
                'menuContent': {
                    templateUrl: "app/locations/locations-list/locations-list.html",
                    controller: 'LocationListController',
                    controllerAs: 'ctrl'
                }
            }
        });
        
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
        
        $stateProvider.state('app.map', {
            url: "/map",
            views: {
                'menuContent': {
                    templateUrl: "app/map/map.html",
                    controller: 'MapController',
                    controllerAs: 'ctrl'
                }
            }
        });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/home');
    });
}
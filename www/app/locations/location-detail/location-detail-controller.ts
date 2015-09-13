/**
 * Created by NOT FUCKING john on 9/12/15.
 */

/// <reference path="../../_app.ts" />

module app.controllers {
    'use strict';

    export class LocationDetailsController {

        public location: app.models.Location;
        public id: number;
        public map: google.maps.Map;

        constructor(private $stateParams: ng.ui.IStateParamsService,
                    private LocationService: services.ILocationService) {

            var ctrl = this;

            ctrl.id = parseInt($stateParams['id']);

            LocationService.getById(ctrl.id).then(function(loc: models.Location) {
                ctrl.location = loc;

                var mapOptions = {
                    center: new google.maps.LatLng(ctrl.location.latitude, ctrl.location.longitude),
                    zoom: 16,
                    mapTypeId: <number>google.maps.MapTypeId.ROADMAP
                };
               
                var target = document.querySelector(".mapClass");

                ctrl.map = new google.maps.Map(target, mapOptions);

                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(ctrl.location.latitude, ctrl.location.longitude),
                    map: ctrl.map,
                    title: ctrl.location.name
                });
            });
        }
    }

}
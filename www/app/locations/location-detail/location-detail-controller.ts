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

        constructor(private $state: ng.ui.IStateService,
            private $stateParams: ng.ui.IStateParamsService,
            private LocationService: services.ILocationService) {
            var _this = this;
            var mapOptions: google.maps.MapOptions;
            _this.id = parseInt($stateParams['id']);
            LocationService.getById(_this.id).then(function(loc: models.Location) {
                _this.location = loc;
                mapOptions = {
                    center: new google.maps.LatLng(_this.location.latitude, _this.location.longitude),
                    zoom: 16,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
               
                var target = document.querySelector(".mapClass");
                _this.map = new google.maps.Map(target, mapOptions);
                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(_this.location.latitude, _this.location.longitude),
                    map: _this.map,
                    title: 'yolo'
                });
            });
        }
    }

}
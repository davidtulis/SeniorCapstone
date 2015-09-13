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
                    private LocationService: services.ILocationService){

            var ctrl = this;
            ctrl.id = parseInt($stateParams['id']);

            LocationService.getById(ctrl.id).then(function(loc: models.Location) {

                ctrl.location = loc;
                ctrl.map = new google.maps.Map($('.google-map')[0]);
                ctrl.map.setCenter({lat: ctrl.location.latitude, lng: ctrl.location.longitude});
            }); 
        }
    }
    
}
/**
 * Created by NOT FUCKING john on 9/12/15.
 */

/// <reference path="../../_app.ts" />

module app.controllers {
    'use strict';
	
    export class LocationDetailsController {
        
        public location: app.models.Location;
        public id: number;
        public map: Object;
        
        constructor(private $state: ng.ui.IStateService,
                    private $stateParams: ng.ui.IStateParamsService,
                    private LocationService: services.ILocationService,
                    private uiGmapGoogleMapApi: Object){

            var ctrl = this;
            ctrl.id = parseInt($stateParams['id']);
            LocationService.getById(ctrl.id).then((data: models.Location) => {

                ctrl.location = data;
                ctrl.map = {
                    show: true,
                    center: {

                        latitude: ctrl.location.latitude,
                        longitude: ctrl.location.longitude
                    },

                    zoom: 8
                };

                (<ng.IPromise<any>>ctrl.uiGmapGoogleMapApi).then((maps) => {
                    console.log(maps);
                });
            }); 
        }
    }
    
}
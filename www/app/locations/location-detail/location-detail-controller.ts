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
                    private LocationService: services.ILocationService){
            console.log($state);
            console.log($stateParams);
            this.id = parseInt($stateParams['id']);
            LocationService.getById(this.id).then((data: models.Location) => {
                this.location=data;
                this.map={ center: { latitude: this.location.latitude, longitude: this.location.longitude}, zoom: 8 };
            });

        }        
        
    }
    
}
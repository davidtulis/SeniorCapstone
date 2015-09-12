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
            var _this = this;
            _this.id = parseInt($stateParams['id']);
            LocationService.getById(_this.id).then(function(loc: models.Location) {
                _this.location = loc;
                console.log(_this.location);
                _this.map={ center: { latitude: _this.location.latitude, longitude: _this.location.longitude}, zoom: 8 };
            }); 
        }
        //initMap();
        
    }
    
}
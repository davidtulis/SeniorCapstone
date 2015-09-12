/**
 * Created by john on 9/11/15.
 */

/// <reference path="../../_app.ts" />

module app.controllers {
    'use strict';

    export class LocationsListController {

        public locations: models.Location[];
        public locationType: models.LocationType;
        public districts: models.District[];
        public districtFilter: models.District;

        constructor(private LocationService: services.ILocationService, private $state: ng.ui.IStateService) {

            LocationService.getLocationType($state.params['locationTypeId']).then((data: models.LocationType) => {

                this.locationType = data;
                this.locations = data.locations;
            });

            LocationService.getDistricts().then((data: models.District[]) => {

                this.districts = data;
            });
        }

        public filterLocations() {

            if (this.districtFilter) {

                this.locations = _.intersection(this.locationType.locations, this.districtFilter.locations);
            } else {

                this.locations = this.locationType.locations;
            }
        }
    }
}
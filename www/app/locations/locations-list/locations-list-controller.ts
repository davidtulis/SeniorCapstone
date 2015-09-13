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

        constructor(private LocationService: services.ILocationService,
                    private $state: ng.ui.IStateService,
                    private $ionicLoading,
                    private $ionicPopup) {

            this.showLoading(true);

            LocationService.getLocationType($state.params['locationTypeId']).then((data: models.LocationType) => {

                this.locationType = data;
                this.locations = data.locations;
                this.showLoading(false);
            }, (reason: ng.IHttpPromiseCallbackArg<any>) => {
                this.showLoading(false);
                $ionicPopup.alert({
                    title: 'Sorry',
                    template: 'Could not load locations'
                });
                console.log(reason);
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

        private showLoading(yes: boolean) {
            if (yes) {
                this.$ionicLoading.show({
                    template: 'Loading locations<br /><br /><ion-spinner icon="android" class="spinner-royal"></ion-spinner>'
                });
            } else {
                this.$ionicLoading.hide();
            }
        }
    }
}
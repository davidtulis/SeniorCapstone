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
                    private $ionicPopup,
                    private $q: ng.IQService) {

            this.showLoading(true);

            $q.all({
                locationType: LocationService.getLocationType($state.params['locationTypeId']),
                districts: LocationService.getDistricts()
            }).then((data: Object) => {

                this.locationType = <models.LocationType>data['locationType'];
                this.locations = this.locationType.locations;
                this.districts = <models.District[]>data['districts'];
                this.showLoading(false);

            }, (reason: ng.IHttpPromiseCallbackArg<any>) => {

                this.showLoading(false);

                $ionicPopup.alert({
                    title: 'Sorry',
                    template: 'Could not load data'
                });

                console.log(reason);
            });
        }

        public filterLocations() {

            if (this.districtFilter) {

                this.locations = _.intersection(this.locationType.locations, this.districtFilter.locations);
            } else {

                this.locations = this.locationType.locations;
            }
        }

        private showLoading(isLoading: boolean) {
            if (isLoading) {
                this.$ionicLoading.show({
                    template: 'Loading locations<br /><br /><ion-spinner icon="android" class="spinner-royal"></ion-spinner>'
                });
            } else {
                this.$ionicLoading.hide();
            }
        }
    }
}
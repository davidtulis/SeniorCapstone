/**
 * Created by john on 9/11/15.
 */

/// <reference path="../../_app.ts" />

module app.controllers {
    'use strict';

    export class LocationListController {
        locations: models.Location[];
        selectedLocation: models.Location;
        district: string;
        searchTerm: string;
        
        constructor(private LocationService: services.ILocationService, 
            private $state: ng.ui.IStateService, 
            private $ionicLoading) {
                if ($state.params["district"]) {
                    this.district = $state.params["district"];
                }
                this.showLoading(true);
                LocationService.search(this.district, this.searchTerm).then((response) => {
                    this.locations = response;
                    this.showLoading(false);
                }, (reason) => {
                    this.showLoading(false);
                    console.log(reason);
                });
            }
            
            search() {
                this.LocationService.search(this.district, this.searchTerm).then((response) => {
                    this.locations = response;
                    this.showLoading(false);
                }, (reason) => {
                    this.showLoading(false);
                    console.log(reason);
                });
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
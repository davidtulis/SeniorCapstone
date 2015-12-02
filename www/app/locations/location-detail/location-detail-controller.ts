/**
 * Created by john on 9/12/15.
 */

/// <reference path="../../_app.ts" />

module app.controllers {
    'use strict';

    export class LocationDetailsController {

        public location: app.models.Location;
        public id: number;
        public map: google.maps.Map;

        constructor(private $stateParams: ng.ui.IStateParamsService,
                    private LocationService: services.ILocationService,
                    private $ionicLoading,
                    private $ionicPopup) {

            var ctrl = this;

            ctrl.showLoading(true);
            ctrl.id = parseInt($stateParams['id']);

            LocationService.getById(ctrl.id).then((data: models.Location) => {

                ctrl.location = data;

                var mapOptions = {
                    center: new google.maps.LatLng(ctrl.location.latitude, ctrl.location.longitude),
                    zoom: 16,
                    mapTypeId: <number>google.maps.MapTypeId.ROADMAP
                };
               
                var target = document.getElementById("locationmap");

                ctrl.map = new google.maps.Map(target, mapOptions);

                new google.maps.Marker({
                    position: new google.maps.LatLng(ctrl.location.latitude, ctrl.location.longitude),
                    map: ctrl.map,
                    title: ctrl.location.title
                });

                ctrl.showLoading(false);
            }, (reason: ng.IHttpPromiseCallbackArg<any>) => {

                this.showLoading(false);

                $ionicPopup.alert({
                    title: 'Sorry',
                    template: 'Could not load data'
                });

                console.log(reason);
            });
        }

        openBrowser() {
            var ctrl = this;
            window.open(ctrl.location.website, "_system");
        }

        openMap() {
            var ctrl = this;

            var lngLat = ctrl.location.latitude + "," + ctrl.location.longitude;

            window.open("http://maps.google.com/maps?&mrt=yp&t=m&q="+ ctrl.location.latitude + "+" + ctrl.location.longitude, "_system");
        }

        private showLoading(isLoading: boolean) {
            if (isLoading) {
                this.$ionicLoading.show({
                    template: 'Loading location<br /><br /><ion-spinner icon="android" class="spinner-royal"></ion-spinner>'
                });
            } else {
                this.$ionicLoading.hide();
            }
        }
    }

}
/**
 * Created by your fucking mother on 6/9/69.
 */

/// <reference path="../_app.ts" />


// http://codepen.io/ionic/pen/uzngt?editors=001

module app.controllers {
    'use strict';

    export class MapController {
		public map: google.maps.Map;
		public latLng: google.maps.LatLng;
		public mapOptions: google.maps.MapOptions;
		public infowindow: google.maps.InfoWindow;
		public marker: google.maps.Marker;
		
        constructor(private LocationService: services.ILocationService,
					private $ionicLoading) {
			var ctrl = this;

			ctrl.showLoading(true);

			LocationService.getAll().then((response) => {
				ctrl.init();
				response.forEach((location) => {
					new google.maps.Marker({
						position: new google.maps.LatLng(location.latitude, location.longitude),
						map: ctrl.map,
						title: location.title
					});
				});

				ctrl.showLoading(false);
			});
		}
		
		private init(): void {
			var ctrl = this;
			
			ctrl.latLng = new google.maps.LatLng(35.045719, -85.309629); //https://goo.gl/MRd87E
			
			var mapOptions = {
				center: ctrl.latLng,
				zoom: 12,
				mapTypeId: <number>google.maps.MapTypeId.ROADMAP
			};

			var target = document.getElementById("chattanoogamap");
			
			ctrl.map = new google.maps.Map(target, mapOptions);
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
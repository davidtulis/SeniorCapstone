/// <reference path="../_app.ts" />

module app.controllers {
    'use strict';

	class MarkerWithId extends google.maps.Marker {
		id: number;
	}

    export class MapController {
		public map: google.maps.Map;
		public latLng: google.maps.LatLng;
		public locations: models.Location[];
		
        constructor(private LocationService: services.ILocationService,
					private $ionicLoading,
					private $state: ng.ui.IStateService) {
			var ctrl = this;

			ctrl.showLoading(true);

			LocationService.getAll().then((response) => {
				ctrl.init();
				ctrl.locations = response;
				response.forEach((location) => {
					var marker = new MarkerWithId({
						position: new google.maps.LatLng(location.latitude, location.longitude),
						map: ctrl.map,
						title: location.title,
						clickable: true
					});

					marker.id = location.id;

					marker.addListener("click", () => {
						$state.go("app.details", {id: marker.id});
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
				zoom: 14,
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
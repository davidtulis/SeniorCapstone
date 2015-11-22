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
		
        constructor(
			// private $compile: ng.ICompileService,
			private $window: ng.IWindowService
		) {
			var ctrl = this;
			ctrl.init();
		}
		
		private init(): void {
			var ctrl = this;
			
			ctrl.latLng = new google.maps.LatLng(35.045719, -85.309629); //https://goo.gl/MRd87E
			
			var mapOptions = {
				center: ctrl.latLng,
				zoom: 12,
				mapTypeId: <number>google.maps.MapTypeId.ROADMAP
			};

			var target = document.querySelector(".mapClass");
			
			ctrl.map = new google.maps.Map(target, mapOptions);
		}
	}
}
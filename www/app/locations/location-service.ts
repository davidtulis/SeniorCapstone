/**
 * Created by john on 9/11/15.
 */

/// <reference path="../_app.ts" />

module app.services {
    'use strict';

    export interface ILocationService {

        getByDistrict(districtId: number): ng.IPromise<models.Location[]>;
        getById(locationId: number): ng.IPromise<models.Location>;
        getByLocationType(locationTypeId: number): ng.IPromise<models.Location[]>;
        getDistrict(districtId: number): ng.IPromise<models.District>;
        getDistricts(): ng.IPromise<models.District[]>;
        getLocationType(locationTypeId: number): ng.IPromise<models.LocationType>;
        getLocationTypes(): ng.IPromise<models.LocationType[]>;
        // TODO: Implement Search
        // searchLocations(searchTerm: string): ng.IPromise<Location[]>;
    }

    export class LocationService implements ILocationService {

        private districts: models.District[] = [];
        private locationTypes: models.LocationType[] = [];
        private apiEndpoint = 'http://www.downtownchattanooga.org/feeds/mapdata.json.html';

        constructor(private $q: ng.IQService, private $http: ng.IHttpService) {

            this.districts.push({ id: 0, name: 'Bluff View', locations: [] });
            this.districts.push({ id: 1, name: 'City Center', locations: [] });
            this.districts.push({ id: 2, name: 'MLK/UTC', locations: [] });
            this.districts.push({ id: 3, name: 'Northshore', locations: [] });
            this.districts.push({ id: 4, name: 'Riverfront', locations: [] });
            this.districts.push({ id: 5, name: 'Southside', locations: [] });

            this.locationTypes.push({ id: 0, name: 'Entertainment', locations: [] });
            this.locationTypes.push({ id: 1, name: 'Restaurant', locations: [] });
            this.locationTypes.push({ id: 2, name: 'Shop', locations: [] });
            this.locationTypes.push({ id: 3, name: 'Default', locations: [] });
        }

        public getByDistrict(districtId: number): ng.IPromise<models.Location[]> {

            var deferred = this.$q.defer();

            this.loadData().then(() => {

                deferred.resolve(this.districts[districtId].locations);
            });

            return deferred.promise;
        }

        public getById(locationId: number): ng.IPromise<models.Location> {

            var deferred = this.$q.defer();
            var result: models.Location;

            this.loadData().then((locations) => {

                _.forEach(locations, (location: models.Location) => {
                    
                    if(location.id === locationId) {
                        
                        result = location;
                    }
                });

                deferred.resolve(result);
            });

            return deferred.promise;
        }

        public getByLocationType(locationTypeId: number): ng.IPromise<models.Location[]> {

            var deferred = this.$q.defer();

            this.loadData().then(() => {

                deferred.resolve(this.locationTypes[locationTypeId].locations);
            });

            return deferred.promise;
        }

        public getDistrict(districtId: number): ng.IPromise<models.District> {

            var deferred = this.$q.defer();

            this.loadData().then(() => {

                deferred.resolve(this.districts[districtId]);
            });

            return deferred.promise;
        }

        public getDistricts(): ng.IPromise<models.District[]> {

            var deferred = this.$q.defer();

            this.loadData().then(() => {

                deferred.resolve(this.districts);
            });

            return deferred.promise;
        }

        public getLocationType(locationTypeId: number): ng.IPromise<models.LocationType> {

            var deferred = this.$q.defer();

            this.loadData().then(() => {

                deferred.resolve(this.locationTypes[locationTypeId]);
            });

            return deferred.promise;
        }

        public getLocationTypes(): ng.IPromise<models.LocationType[]> {

            var deferred = this.$q.defer();

            this.loadData().then(() => {

                deferred.resolve(this.locationTypes);
            });

            return deferred.promise;
        }

        private loadData(): ng.IPromise<Location[]> {

            var deferred = this.$q.defer();
            var locations: models.Location[] = [];

            this.$http.get(this.apiEndpoint, { cache: true }).then((response) => {

                _.forEach(this.districts, (district: models.District) => {

                    district.locations = [];
                });

                _.forEach(this.locationTypes, (locationType: models.LocationType) => {

                    locationType.locations = [];
                });

                var json = JSON.parse((<string>response.data).slice(15, (<string>response.data).length - 2));

                _.forEach(json['items'], (item: Object) => {

                    var location = new models.Location();

                    location.address1 = item['address1'];
                    location.address2 = item['address2'];
                    location.city = item['city'];
                    location.description = JSON.parse('"' + item['description'] + '"');
                    location.id = parseInt(item['itemid']);
                    location.latitude = parseFloat(item['latitude']);
                    location.longitude = parseFloat(item['longitude']);
                    location.name = JSON.parse('"' + item['Title'] + '"');
                    location.state = item['state'];
                    location.website = item['External Link'];
                    location.zipCode = parseInt(item['zipcode']);

                    _.forEach(this.districts, (district: models.District) => {

                        if(district.name === item['Subtitle']) {

                            location.district = district;
                            district.locations.push(location);
                        }
                    });

                    switch((<string>item['url']).split('/')[2].split('-')[0]) {

                        case 'arts':
                            location.locationType = this.locationTypes[0];
                            this.locationTypes[0].locations.push(location);
                            break;
                        case 'food':
                            location.locationType = this.locationTypes[1];
                            this.locationTypes[1].locations.push(location);
                            break;
                        case 'shopping':
                            location.locationType = this.locationTypes[2];
                            this.locationTypes[2].locations.push(location);
                            break;
                        case 'retail':
                            location.locationType = this.locationTypes[2];
                            this.locationTypes[2].locations.push(location);
                            break;
                        default:
                            location.locationType = this.locationTypes[3];
                            this.locationTypes[3].locations.push(location);
                    }

                    locations.push(location);
                });

                deferred.resolve(locations);
            });

            return deferred.promise;
        }
    }
}
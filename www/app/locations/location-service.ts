/**
 * Created by john on 9/11/15.
 */

/// <reference path="../_app.ts" />

module app.services {
    'use strict';

    export interface ILocationService {
        getAll(): ng.IPromise<models.Location[]>;
        getById(id:number): ng.IPromise<models.Location>;
        getByDistrict(district:string): ng.IPromise<models.Location[]>;
        getByLocationType(locationType:string): ng.IPromise<models.Location[]>;
    }

    export class LocationService implements ILocationService {
        private apiEndpoint = 'http://www.downtownchattanooga.org/feeds/mapdatav3.json.html';

        constructor(private $q:ng.IQService, private $http:ng.IHttpService) {
        }

        getAll():ng.IPromise<models.Location[]> {
            var deferred = this.$q.defer<models.Location[]>();

            this.$http.get<models.SeverResponse>(this.apiEndpoint)
                .success((response) => {
                    deferred.resolve(this.processResponse(response));
                }).error((error) => {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        getById(id: number): ng.IPromise<models.Location> {
            var deferred = this.$q.defer<models.Location>();

            this.$http.get<models.SeverResponse>()
        }

        private processResponse(response:models.ServerResponse):models.Location[] {
            var locations:models.Location[] = [];

            response.Items.forEach((item) => {
                var location = new models.Location(item);
                locations.push(location);
            });

            return locations;
        }
    }
}
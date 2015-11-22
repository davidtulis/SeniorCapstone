/**
 * Created by john on 9/11/15.
 */

/// <reference path="../_app.ts" />

module app.services {
    'use strict';

    export interface ILocationService {
        getAll(): ng.IPromise<models.Location[]>;
        getById(id:number): ng.IPromise<models.Location>;
        search(district?:string, searchTerm?:string): ng.IPromise<models.Location[]>;
    }

    export class LocationService implements ILocationService {
        private apiEndpoint = 'http://www.downtownchattanooga.org/feeds/mapdatav3.json.html';

        constructor(private $q:ng.IQService, private $http:ng.IHttpService) {
        }

        getAll():ng.IPromise<models.Location[]> {
            var deferred = this.$q.defer<models.Location[]>();

            this.$http.get<models.ServerResponse>(this.apiEndpoint)
                .success((response) => {
                    deferred.resolve(this.processResponse(response));
                }).error((error) => {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        getById(id:number):ng.IPromise<models.Location> {
            var deferred = this.$q.defer<models.Location>();

            this.$http.get<models.ServerResponse>(this.apiEndpoint, {itemid: id})
                .success((response) => {
                    deferred.resolve(this.processResponse(response)[0]);
                }).error((error) => {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        search(district?:string, searchTerm?:string):ng.IPromise<models.Location[]> {
            var deferred = this.$q.defer<models.Location[]>();

            this.$http.get<models.ServerResponse>(this.apiEndpoint, {n: district, s: searchTerm})
                .success((response) => {
                    deferred.resolve(this.processResponse(response));
                }).error((error) => {
                    deferred.reject(error);
                });

            return deferred.promise;
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
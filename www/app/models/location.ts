/**
 * Created by john on 9/11/15.
 */

/// <reference path="../_app.ts" />

module app.models {
    'use strict';

    export class Location {

        public id: number;
        public latitude: number;
        public longitude: number;
        public address1: string;
        public address2: string;
        public city: string;
        public state: string;
        public zipCode: number;
        public website: string;
        public description: string;
        public locationType: LocationType;
        public district: District;
        public name: string;
    }
}
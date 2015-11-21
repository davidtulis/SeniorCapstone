/**
 * Created by john on 9/11/15.
 */

/// <reference path="../_app.ts" />

module app.models {
    'use strict';
    export class ServerData {

        public itemid: number;
        public latitude: number;
        public longitude: number;
        public address1: string;
        public address2: string;
        public city: string;
        public state: string;
        public zipCode: number;
        public website: string;
        public neighborhood: string;
        public title: string;
        public tags: string;
    }

    export class SeverResponse {
        public Items: models.ServerData[];
    }

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
        public district: string;
        public title: string;
        public tags: string[];

        constructor(data: ServerData) {
            this.id = data.itemid;
            this.latitude = data.latitude;
            this.longitude = data.longitude;
            this.address1 = data.address1;
            this.address2 = data.address2;
            this.city = data.city;
            this.state = data.state;
            this.zipCode = data.zipCode;
            this.website = data.website;
            this.district = data.neighborhood;
            this.title = data.title;
            this.tags = data.tags.split(',');
        }
    }
}
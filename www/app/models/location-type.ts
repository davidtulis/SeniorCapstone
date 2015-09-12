/**
 * Created by john on 9/11/15.
 */

/// <reference path="../_app.ts" />

module app.models {
    'use strict';

    export class LocationType {

        public id: number;
        public name: string;
        public locations: models.Location[];
    }
}
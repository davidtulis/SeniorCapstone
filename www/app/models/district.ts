/**
 * Created by john on 9/8/15.
 */

/// <reference path="../_app.ts" />

module app.models {
    'use strict';

    export class District {

        public id: number;
        public name: string;
        public locations: models.Location[];
    }
}
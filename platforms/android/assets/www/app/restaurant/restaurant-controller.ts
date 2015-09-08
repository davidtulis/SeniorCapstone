/// <reference path="../_app.ts" />

module app.controllers {

    export class RestaurantController {
        public restaurants: string[];

        constructor(){

            this.restaurants = [
                "Taco Mamacita",
                "Whole Foods",
                "Your mom's"
            ];

        }
    }
}

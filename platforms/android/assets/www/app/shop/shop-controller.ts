/// <reference path="../_app.ts" />

module app.controllers {

    export class ShopController {
        public shops: string[];

        constructor(){

            this.shops = [
                "Trek Bikes",
                "Salon place",
                "Whatever"
            ];

        }
    }
}

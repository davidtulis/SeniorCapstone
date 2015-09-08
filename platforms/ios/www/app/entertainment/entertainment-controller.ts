/// <reference path="../_app.ts" />

module app.controllers {

    export class EntertainmentController {
        public theaters: string[];

        constructor(){

            this.theaters = [
                "The Rave",
                "Majesctic",
                "Tivoli"
            ];

        }
    }
}

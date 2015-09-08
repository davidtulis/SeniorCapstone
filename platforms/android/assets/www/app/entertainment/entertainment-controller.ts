/// <reference path="../_app.ts" />

module app.controllers {

    export class EntertainmentController {
        public theaters: any;
        public districts: string[];
        public filter: string;

        constructor(){

            this.filter = "";

            this.districts = [
                '', //#nofilter #yolo #swag
                'Northshore',
                'Riverfront',
                'Bluff View',
                'City Center',
                'MLK',
                'Southside'
            ];

            this.theaters = [
                {'dist': 'Northshore', 'name': 'Chattanooga Theatre Centre'},
                {'dist': 'Riverfront', 'name': 'Rhythm & Brews'},
                {'dist': 'Riverfront', 'name': 'Tennessee Aquarium'},
                {'dist': 'Bluff View', 'name': 'Tennessee Riverwalk'},
                {'dist': 'Bluff View', 'name': 'Hunter Museum of Art'},
                {'dist': 'City Center', 'name': 'Tivoli Theare'},
                {'dist': 'MLK', 'name': 'JJ\'s Bohemia'},
                {'dist': 'MLK', 'name': 'Lindsay Street Hall'},
                {'dist': 'Southside', 'name': 'Finley Stadium'},
                {'dist': 'Southside', 'name': 'Southside Social'},
                {'dist': 'Southside', 'name': 'Track 29'}
            ];

        }
    }
}

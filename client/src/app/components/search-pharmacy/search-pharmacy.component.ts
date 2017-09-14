import { document } from 'ngx-bootstrap/utils/facade/browser';
import { Component, OnInit } from '@angular/core';
//import { googlemaps } from 'google-maps';
import { } from '@types/googlemaps';

@Component({
    selector: 'evolve-search-pharmacy',
    templateUrl: './search-pharmacy.component.html',
    styleUrls: ['./search-pharmacy.component.css']
})
export class SearchPharmacyComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

    onInputChange($event) {
        // enters here when input is detected
        // GoogleMapsLoader

        var input = <HTMLInputElement>document.getElementById('searchTextField');

        if (input) {
            var options = {
                types: [
                    'establishment',
                    'regions'
                ],
            };
            // var autocomplete = new google.maps.places.Autocomplete(input, options);
            var autocomplete = new google.maps.places.Autocomplete(input);
        }
    }
}


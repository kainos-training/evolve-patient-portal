import { document } from 'ngx-bootstrap/utils/facade/browser';
import { Component, OnInit } from '@angular/core';
import { } from '@types/googlemaps';

@Component({
    selector: 'evolve-search-pharmacy',
    templateUrl: './search-pharmacy.component.html',
    styleUrls: ['./search-pharmacy.component.css']
})
export class SearchPharmacyComponent implements OnInit {

    public searchText: String;

    constructor() { }

    ngOnInit() {
    }

    onInputChange($event) {
        // enters here when input is detected
        // GoogleMapsLoader
        console.log(this.searchText);

        var input = <HTMLInputElement>document.getElementById('searchTextField');

        if (input) {
            var options = {
                types: [
                    'establishment',
                    'regions'
                ],
            };
            var autocomplete = new google.maps.places.Autocomplete(input);
        }

    
    }
}


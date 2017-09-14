import { document } from 'ngx-bootstrap/utils/facade/browser';
import { AfterContentInit, Component, OnInit } from '@angular/core';
// import { googlemaps } from 'google-maps';
import { } from '@types/googlemaps';

@Component({
    selector: 'evolve-search-pharmacy',
    templateUrl: './search-pharmacy.component.html',
    styleUrls: ['./search-pharmacy.component.css']
})
export class SearchPharmacyComponent implements OnInit, AfterContentInit {

    private autocomplete: google.maps.places.Autocomplete;

    constructor() { }

    ngOnInit() {

    }

    ngAfterContentInit() {
        //Called after ngOnInit when the component's or directive's content has been initialized.
        //Add 'implements AfterContentInit' to the class.
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 15
        });

        var pyrmont = new google.maps.LatLng(-33.8665433, 151.1956316);
        var request = {
            location: pyrmont,
            query: 'pharmacy'
        };

        var service = new google.maps.places.PlacesService(map);
        service.textSearch(request, function () {
            console.log("testtest")
        });
    }

    onInputChange($event) {
        // enters here when input is detected

        // get user input
        const userInput = $event.target.value;

        var input = <HTMLInputElement>document.getElementById('searchTextField');

        if (input) {
            var options = {
                types: ['pharmacy']
            };
            this.autocomplete = new google.maps.places.Autocomplete(input, options);
            // this.autocomplete.addListener('place_changed', this.onPlaceChanged);
        }
    }

    // onPlaceChanged() {
    //     conso
    //     console.log(this.autocomplete.getPlace());
    // }
}


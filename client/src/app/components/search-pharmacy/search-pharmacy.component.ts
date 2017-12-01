import { GeoCoder } from '@ngui/ngui/node_modules/@ngui/map/dist';
import { NavigatorGeolocation } from '@ngui/map';
import { Subscription } from 'rxjs/Rx';
import { document } from 'ngx-bootstrap/utils/facade/browser';
import { Component, OnDestroy, OnInit } from '@angular/core';
// import { googlemaps } from 'google-maps';
import { } from '@types/googlemaps';

@Component({
    selector: 'evolve-search-pharmacy',
    templateUrl: './search-pharmacy.component.html',
    styleUrls: ['./search-pharmacy.component.css']
})
export class SearchPharmacyComponent implements OnInit, OnDestroy {

    static locationsFromSearch: google.maps.GeocoderResult[] = [];

    private autocomplete: google.maps.places.Autocomplete;
    private subCenter: Subscription;
    private navigatorGeolocation = new NavigatorGeolocation();
    private geocoder = new google.maps.Geocoder();

    constructor() { }

    ngOnInit() {
        this.subCenter = this.navigatorGeolocation.getCurrentPosition({ 'timeout': 10000 }).subscribe((location) => {
            const userLatLng = new google.maps.LatLng(location.coords.latitude, location.coords.longitude);
            // this.getPharmaciesForLatLng(userLatLng);
        });
    }

    onInputChange($event) {
        // enters here when input is detected
        if ($event.keyCode != 13) {
            // return if enter key was not pressed
            return;
        }

        // get user input
        const userInput = $event.target.value;
        this.getLocationsForArea(userInput);
    }

    getLocationsForArea(area) {
        // make geocode request
        var geocoderRequest = {
            address: area
        }

        // send the request
        this.geocoder.geocode(geocoderRequest, this.handleGeocoderResults);
    }

    handleGeocoderResults(results, status) {
        // check status of response
        if (status === google.maps.GeocoderStatus.OK) {
            // loop through results
            for (var i = 0; i < results.length; i++) {
                // create latLng object for the result
                const latLng = new google.maps.LatLng(results[i].geometry.location.lat(), results[i].geometry.location.lng())
                var map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 15
                });

                // var request = {
                //     location: latLng,
                //     query: 'pharmacy'
                // };
                var request = {
                    location: latLng,
                    type: 'pharmacy',
                    radius: 10000
                };

                var service = new google.maps.places.PlacesService(map);
                service.nearbySearch(request, SearchPharmacyComponent.handlePlacesNearbySearch);
                // service.textSearch(request, this.handlePlacesNearbySearch);
            }
        } else {
            console.log("error with geocoder");
        }
    }

    static handlePlacesNearbySearch(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            // reinit the array 
            SearchPharmacyComponent.locationsFromSearch = [];
            // loop results
            for (var i = 0; i < results.length; i++) {
                SearchPharmacyComponent.locationsFromSearch.push(results[i]);
            }
            // console.log("pharmacies for specified area: ", SearchPharmacyComponent.locationsFromSearch);
        } else {
            console.log("PlacesService error");
        }
    }

    ngOnDestroy() {
        //Called once, before the instance is destroyed.
        //Add 'implements OnDestroy' to the class.
        this.subCenter.unsubscribe();
    }

    get locations() {
        return SearchPharmacyComponent.locationsFromSearch;
    }
}


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

    private autocomplete: google.maps.places.Autocomplete;
    private subCenter: Subscription;
    private navigatorGeolocation = new NavigatorGeolocation();
    private geocoder = new google.maps.Geocoder();

    public searchText: String;

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

        var geocoderRequest = {
            address: userInput
        }

        this.geocoder.geocode(geocoderRequest, function (results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                for (var i = 0; i < results.length; i++) {
                    const latLng = new google.maps.LatLng(results[i].geometry.location.lat(), results[i].geometry.location.lng())
                    var map = new google.maps.Map(document.getElementById('map'), {
                        zoom: 15
                    });
            
                    var request = {
                        location: latLng,
                        query: 'pharmacy'
                    };
            
                    var service = new google.maps.places.PlacesService(map);
                    service.textSearch(request, function (results, status) {
                        if (status == google.maps.places.PlacesServiceStatus.OK) {
                            for (var i = 0; i < results.length; i++) {
                                console.log(results[i].name);
                            }
                        }
                    });
                }
            } else {
                console.log("error with geocoder");
            }
        });

        // var input = <HTMLInputElement>document.getElementById('searchTextField');

        // if (input) {
        //     var options = {
        //         types: ['pharmacy']
        //     };
        //     this.autocomplete = new google.maps.places.Autocomplete(input);
        //     this.autocomplete.addListener('place_changed', this.onPlaceChanged);
        // }
    }

    getPharmaciesForLatLng(latLng) {
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 15
        });

        var request = {
            location: latLng,
            query: 'pharmacy'
        };

        var service = new google.maps.places.PlacesService(map);
        service.textSearch(request, function (results, status) {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                for (var i = 0; i < results.length; i++) {
                    console.log(results[i].name);
                }
            }
        });
    }

    onPlaceChanged() {
        console.log(this.autocomplete);
    }

    ngOnDestroy() {
        //Called once, before the instance is destroyed.
        //Add 'implements OnDestroy' to the class.
        this.subCenter.unsubscribe();
    }
}


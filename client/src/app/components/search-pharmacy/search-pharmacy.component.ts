import { document } from 'ngx-bootstrap/utils/facade/browser';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'evolve-search-pharmacy',
    templateUrl: './search-pharmacy.component.html',
    styleUrls: ['./search-pharmacy.component.css']
})
export class SearchPharmacyComponent implements OnInit {

    public locationsFromSearch: google.maps.GeocoderResult[] = [];
    private geoCoder = new google.maps.Geocoder();
    public isLoading: boolean = false;
    private userInput: string = "";
    private indexLimit: number = 5;
    private selectedLocation: string = "";
    public displayMoreAvailable: boolean = true;

    constructor() { }

    ngOnInit() {
        this.locationsFromSearch = [];
    }

    onInputChange($event) {
        if ($event.keyCode != 13) {
            return;
        }
        this.locationSearch();
    }

    locationsChangeDropdown(elemName: string){
        if(elemName=="Display More..."){
            this.indexLimit=this.locationsFromSearch.length;
            this.selectedLocation = "- - Select a Pharmacy - -";
            this.displayMoreAvailable = false;
        }
    }

    onSearchClick(){
        this.locationSearch();
    }

    locationSearch(){
        this.displayMoreAvailable = true;
        this.selectedLocation = "- - Select a Pharmacy - -";
        this.indexLimit = 5;
        this.isLoading = true;
        this.locationsFromSearch = [];
        this.getListOfLocations(this.userInput).then((result: google.maps.GeocoderResult[])=>{
            this.isLoading = false;
            this.selectedLocation = "- - Select a Pharmacy - -";
            this.locationsFromSearch = result;
        });
    }

    public getListOfLocations(area: string){
        return new Promise((resolve, reject)=>{
            let geoCoderRequest = {
                address: area
            };
            this.geoCoder.geocode(geoCoderRequest, (results, status)=>{
                if (status === google.maps.GeocoderStatus.OK) {
                    for (let i = 0; i < results.length; i++) {
                        const latLng = new google.maps.LatLng(results[i].geometry.location.lat(), results[i].geometry.location.lng())
                        let map = new google.maps.Map(document.getElementById('map'), {
                            zoom: 15
                        });

                        let request = {
                            location: latLng,
                            type: 'pharmacy',
                            radius: 10000
                        };

                        let service = new google.maps.places.PlacesService(map);
                        service.nearbySearch(request, (results, status)=>{
                            if (status == google.maps.places.PlacesServiceStatus.OK) {
                                let resultArr = [];
                                for (let i = 0; i < results.length; i++) {
                                    resultArr.push(results[i]);
                                }
                                resolve(resultArr);
                            } else {
                                reject("PlacesService error");
                            }
                        });
                    }
                } else {
                    reject("error with geoCoder");
                }
            });
        });
    }

    get locations() {
        return this.locationsFromSearch;
    }
}


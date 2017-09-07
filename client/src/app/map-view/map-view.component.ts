import {Subscription} from 'rxjs/Rx';
import {NavigatorGeolocation} from '@ngui/map';
import {AfterContentInit, Component, Input, OnDestroy} from '@angular/core';
import {} from '@types/googlemaps';

declare var google: any;

@Component({
    selector: 'evolve-map-view',
    templateUrl: './map-view.component.html',
    styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements AfterContentInit, OnDestroy {

    @Input() departmentAddress;
    @Input() userLocation;

    private center;
    private subCenter: Subscription;
    private navigatorGeolocation = new NavigatorGeolocation();
    private positions = [];
    private directionsRenderer: google.maps.DirectionsRenderer;
    private directionsResult: google.maps.DirectionsResult;
    private directionsRendererDirective = new google.maps.DirectionsRenderer();
    private directions: google.maps.DirectionsRequest = {};

    constructor() {
    }

    ngAfterContentInit() {
        if (this.userLocation) {
            var userLatLng = new google.maps.LatLng(this.userLocation.coords.latitude, this.userLocation.coords.longitude);
            this.center = userLatLng;
            this.directions.origin = userLatLng;
            this.directions.destination = this.departmentAddress;
            this.directions.travelMode = google.maps.TravelMode.DRIVING;
        }
    }

    ngOnDestroy() {
        //Called once, before the instance is destroyed.
        //Add 'implements OnDestroy' to the class.
        this.subCenter.unsubscribe();
    }

    //TODO: Need to remove consoles and redundant methods
    onMapReady(map) {
        // console.log('mapReady', map);
        // console.log('markers', map.markers);  // to get all markers as an array
    }

    onIdle(event) {
        // console.log('mapIdle', event.target);
    }

    onMarkerInit(marker) {
        // console.log('markerInit', marker);
    }

    onMapClick(event) {
        this.positions.push(event.latLng);
        event.target.panTo(event.latLng);
    }

    onMapCenterChanged(event) {
        //console.log("mapCenterChanged");
    }

    onMapZoomChanged(event) {
        //console.log("onMapZoomChanged");
    }

    directionsChanged() {
        // this.directionsResult = this.directionsRenderer.getDirections();
        // this.cdr.detectChanges();
    }

    showDirection() {
        this.directionsRendererDirective['showDirections'](this.directions);
    }
}

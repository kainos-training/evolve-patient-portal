import { Subscription } from 'rxjs/Rx';
import { NavigatorGeolocation } from '@ngui/map';
import { AfterContentInit, Component, Input, OnDestroy} from '@angular/core';
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
    private userLatLng: google.maps.LatLng;

    ngAfterContentInit() {
        if (this.userLocation) {
            this.userLatLng = new google.maps.LatLng(this.userLocation.coords.latitude, this.userLocation.coords.longitude);
            this.center = this.userLatLng;
            this.directions.origin = this.userLatLng;
            this.directions.destination = this.departmentAddress;
            this.directions.travelMode = google.maps.TravelMode.DRIVING;
        }
    }

    ngOnDestroy() {
        if (this.subCenter) {
            this.subCenter.unsubscribe();
        }
    }

    onMapClick(event) {
        this.positions.push(event.latLng);
        event.target.panTo(event.latLng);
    }

    showDirection() {
        this.directionsRendererDirective['showDirections'](this.directions);
    }
}

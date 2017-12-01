import { NavigatorGeolocation } from '@ngui/map';
import { Subscription } from 'rxjs/Rx';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Medication } from '../../class/Medication';
import { ToolTipModule } from 'angular2-tooltip';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { Observable } from 'rxjs/Observable';
import { Pharmacy } from '../../class/Pharmacy';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
    selector: 'evolve-repeat-prescription',
    templateUrl: './repeat-prescription.component.html',
    styleUrls: ['./repeat-prescription.component.css']
})
export class RepeatPrescriptionComponent implements OnInit, OnInit, OnDestroy {

    public userID: String;
    public dataService: DataService;
    public prescriptionList: Medication[];
    public confirmedPrescriptionList: number[];
    public renewPrescriptionList: Medication[];
    public localPharmacy: Pharmacy[];
    public pharmacy: Pharmacy;
    public modalRef: BsModalRef;
    public deliveryType: boolean;
    public warning: boolean;
    public collectionType = {
        status: null
    };

    private showOtherDeliverInputFields: boolean = false;
    private autocomplete: google.maps.places.Autocomplete;
    private subCenter: Subscription;
    private navigatorGeolocation = new NavigatorGeolocation();
    private geocoder = new google.maps.Geocoder();

    static locationsFromSearch: google.maps.GeocoderResult[] = [];
    static handlePlacesNearbySearch(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            // re-init the array
            RepeatPrescriptionComponent.locationsFromSearch = [];
            // loop results
            for (var i = 0; i < results.length; i++) {
                RepeatPrescriptionComponent.locationsFromSearch.push(results[i]);
            }
            console.log('pharmacies for specified area: ', RepeatPrescriptionComponent.locationsFromSearch);
        } else {
            console.log('PlacesService error');
        }
    }


    constructor(dataService: DataService, private modalService: BsModalService) {
        let data;
        this.renewPrescriptionList = new Array();
        this.dataService = dataService;
        this.confirmedPrescriptionList = new Array();
        this.deliveryType = false;
        this.warning = false;

    }

    public addToList(medication: Medication) {
        if (this.renewPrescriptionList.length > 0 && this.renewPrescriptionList.find(p => p.medicationName == medication.medicationName)) {
            this.warning = true;
        } else {
            this.renewPrescriptionList.push(medication);
        }
    }

    public removeFromList(medication: Medication) {
        var i = this.renewPrescriptionList.indexOf(medication);
        this.renewPrescriptionList.splice(i, 1);
    }

    public requestPrescription(prescriptionList: Array<Medication>) {
        console.log(this.collectionType.status);
        if (this.collectionType.status === 'true') {
            this.deliveryType = true;
        } else {
            this.deliveryType = false;
        }

        for (var i = 0; i < this.prescriptionList.length; i++) {
            this.confirmedPrescriptionList.push(this.prescriptionList[i].medicationUserID);
        }
        console.log('test');
        this.dataService.updatePrescriptionDate(this.confirmedPrescriptionList, this.deliveryType);
        this.ngOnInit();
        this.modalRef.hide();
    }

    public openModal(prescriptionList: Array<Medication>, template: TemplateRef<any>, $event) {
        this.modalRef = this.modalService.show(template);
    }

    public closeAlert() {
        this.warning = false;
    }
    ngOnInit() {

        this.userID = this.dataService.getCookie();

        this.dataService.getLocalPharmacy(1).subscribe(res => {
            this.localPharmacy = res;
            this.pharmacy = this.localPharmacy[0];
        });

        this.dataService.getRepeatedMedication(this.userID).subscribe(
            res => this.prescriptionList = res
        );

        this.subCenter = this.navigatorGeolocation.getCurrentPosition({ 'timeout': 10000 }).subscribe((location) => {
            const userLatLng = new google.maps.LatLng(location.coords.latitude, location.coords.longitude);
            // this.getPharmaciesForLatLng(userLatLng);
        });

    }

    otherDeliveryMethodClicked() {
        // show the content
        this.showOtherDeliverInputFields = true;
    }

    onInputChange($event) {
        // enters here when input is detected
        if ($event.keyCode !== 13) {
            // return if enter key was not pressed
            return;
        }

        // get user input
        const userInput = $event.target.value;
        if (userInput.length > 0) {
            this.getLocationsForArea(userInput);
        }
    }

    getLocationsForArea(area) {
        // make geocode request
        const geocoderRequest = {
            address: area
        };

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
                const map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 15
                });

                // var request = {
                //     location: latLng,
                //     query: 'pharmacy'
                // };
                const request = {
                    location: latLng,
                    type: 'pharmacy',
                    radius: 10000
                };

                const service = new google.maps.places.PlacesService(map);
                service.nearbySearch(request, RepeatPrescriptionComponent.handlePlacesNearbySearch);
                // service.textSearch(request, this.handlePlacesNearbySearch);
            }
        } else {
            console.log('error with geocoder');
        }
    }

    ngOnDestroy() {
        // Called once, before the instance is destroyed.
        // Add 'implements OnDestroy' to the class.
        this.subCenter.unsubscribe();
    }

    get locations() {
        return RepeatPrescriptionComponent.locationsFromSearch;
    }

    formEnterPressed($event) {
        const keyCode = $event.keyCode || $event.which;
        if (keyCode === 13) {
            $event.preventDefault();
            return false;
        }
    }
}

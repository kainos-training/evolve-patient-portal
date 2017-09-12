import {DirectionsRenderer, Marker, NguiMapComponent} from '@ngui/map/dist';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MapViewComponent} from './map-view.component';
import {} from '@types/googlemaps';

describe('MapViewComponent', () => {
    let component: MapViewComponent;
    let fixture: ComponentFixture<MapViewComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                MapViewComponent,
                Marker,
                DirectionsRenderer,
                NguiMapComponent
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MapViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});

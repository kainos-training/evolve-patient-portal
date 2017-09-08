import { TestBed, inject } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { DataService } from './data.service';
import { MedicationComment } from '../MedicationComment';
import { MedicationDescription } from '../MedicationDescription';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { SwitchBoardService } from './switch-board.service';
import { User } from '../class/user';
import { Router } from '@angular/router';

export class MockDataService {

    mockDataService: MockDataService;

    medicationComment: Array<MedicationComment> = [];
    medicationDescription: Array<MedicationDescription> = [];

    constructor() {

        this.medicationComment.push(new MedicationComment(1, "Made me sleepy all day.", "06/07/2017"));
        this.medicationComment.push(new MedicationComment(2, "I came out on a rash.", "07/08/2017"));
        this.medicationComment.push(new MedicationComment(3, "Upset stomach with this", "10/08/2017"));

        this.medicationDescription.push(new MedicationDescription("Lithium", "Lithium is a chemical element with symbol Li and atomic number 3"));
        this.medicationDescription.push(new MedicationDescription("Penicillin", "Penicillin V is an antibiotic in the penicillin group of drugs. It fights bacteria in your body."));
        this.medicationDescription.push(new MedicationDescription("Paracetamol", "Paracetamol, also known as acetaminophen or APAP, is a medication used to treat pain and fever. It is typically used for mild to moderate pain."));
    }

    getMedicationUserComments(userID: number) {
        if (userID == 1) {
            return this.medicationComment;
        }
        return -1;
    }

    removeMedicationUserComment(userCommentID: number) {
        var i = this.medicationComment.indexOf(this.medicationComment.find(p => p.medicationUserCommentID == userCommentID));
        let removedComment = this.medicationComment.splice(i, 1);

        return JSON.parse(JSON.stringify(removedComment));
    }

    addMedicationUserComment(medicationUserCommentID: number, comment: String) {
        if (typeof (comment) === "string" && comment != "") {
            this.medicationComment.push(new MedicationComment(4, comment, "11/08/2017"));
            return this.medicationComment;
        }

        else throw new Error("Please enter a comment");
    }

    getWikiSummary(medicationName: String) {
        if (typeof (medicationName) === "string" && medicationName != "") {
            return JSON.parse(JSON.stringify(this.medicationDescription.find(p => p.medicationName == medicationName).description));
        }

        else throw new Error("Please enter a medication name");
    }
}


const mockCookieService = {};
const mockSwitchBoardService = {};
const mockRouter = {};
const mockHttp = {};

beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [
            HttpClientModule
        ],
        providers: [
            DataService,
            { provide: CookieService, useValue: mockCookieService },
            { provide: SwitchBoardService, useValue: mockSwitchBoardService },
            { provide: Router, useValue: mockRouter }
        ]
    });
});

it('should be created', inject([DataService], (service: DataService) => {
    expect(service).toBeTruthy();
}));

it('should map data to user', inject([DataService], (service: DataService) => {
    var user = new User();
    const data = {
        userID: 12345,
        token: "Token test.",
        message: "Successful login."
    };
    user = service.mapDataToUser(user, data);
    expect(user.loggedIn && user.userID && user.token && user.message).toBeTruthy();
}));

it('should not map data to user because token is not valid', inject([DataService], (service: DataService) => {
    var user = new User();
    const data = {
        userID: 12345,
        token: "",
        message: "Successful login."
    };
    user = service.mapDataToUser(user, data);
    expect(user.loggedIn && user.userID && user.token && user.message).toBeFalsy();
}));

it('should not map data to user because data is an empty object', inject([DataService], (service: DataService) => {
    var user = new User();
    const data = {};
    user = service.mapDataToUser(user, data);
    expect(user.loggedIn && user.userID && user.token && user.message).toBeFalsy();
}));

it('should map error to user', inject([DataService], (service: DataService) => {
    var user = new User();
    const error = {
        message: "Invalid credentials."
    };
    user = service.mapErrorToUser(user, error);
    expect(!user.loggedIn && user.message).toBeTruthy();
}));

it('user should not be able to login if the error object is empty', inject([DataService], (service: DataService) => {
    var user = new User();
    const error = {};
    user = service.mapErrorToUser(user, error);
    expect(user.loggedIn).toBeFalsy();
}));

let mockDataService: MockDataService;
describe('DataService', () => {
    this.mockDataService = new MockDataService();
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [{ provide: DataService, useClass: MockDataService }, HttpClient, HttpHandler]
        });
    });

    it('should be created', inject([DataService], (mockDataService: MockDataService) => {
        expect(mockDataService).toBeTruthy();
    }));

    it('should return a list of the users comments on medication. [UserID: 1]', inject([DataService], (mockDataService: MockDataService) => {
        let serviceResult = mockDataService.getMedicationUserComments(1);
        console.log(Object.entries(serviceResult).length);
        expect(Object.entries(serviceResult).length).toBe(3);
    }));

    it('should not return a list of user comments on medication if the user does not exist. [UserID: 0]', inject([DataService], (mockDataService) => {
        let serviceResult = mockDataService.getMedicationUserComments(0);
        expect(Object.entries(serviceResult).length).toBe(0);
    }));

    it('should remove the user comment from the list which the user has chosen. [UserID: 1]', inject([DataService], (mockDataService) => {
        let serviceResult = mockDataService.removeMedicationUserComment(1);
        let serviceResultSize = mockDataService.getMedicationUserComments(1).length;
        let serviceResultJSON = serviceResult[0];

        expect(serviceResultSize).toBe(2);
        expect(serviceResultJSON.medicationUserCommentID).toBe(1);
    }));

    it('should add a new comment to the comment list. [UserID: 1][Comment: This gave me heartburn]', inject([DataService], (mockDataService) => {
        mockDataService.addMedicationUserComment(1, "This gave me heartburn");
        let serviceResultSize = mockDataService.getMedicationUserComments(1).length;

        expect(serviceResultSize).toBe(4);
    }));

    it('should return an error message if the user does not provide a comment. [UserID: 1][Comment: ""]', inject([DataService], (mockDataService) => {
        let serviceResultSize = mockDataService.getMedicationUserComments(1).length;

        expect(serviceResultSize).toBe(3);
        expect(function () {
            mockDataService.addMedicationUserComment(1, "");
        }).toThrow(new Error("Please enter a comment"));
    }));

    it('should return the description of the medication provided. [MedicationName: Penicillin]', inject([DataService], (mockDataService) => {
        let serviceResult = mockDataService.getWikiSummary("Penicillin");

        expect(serviceResult).toBe("Penicillin V is an antibiotic in the penicillin group of drugs. It fights bacteria in your body.");
    }));

    it('should return an error message if the user does not provide a medication name. [MedicationName: ""]', inject([DataService], (mockDataService) => {
        expect(function () {
            mockDataService.getWikiSummary("");
        }).toThrow(new Error("Please enter a medication name"));
    }));
});


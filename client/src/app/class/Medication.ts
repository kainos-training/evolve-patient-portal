export class Medication {
    medicationUserID : number;
    medicationID : number;
    medicationName : String;
    medicationType : String;
    startDate : Date;
    endDate : Date;
    dosage : String;


    constructor(medicationUserID: number, medicationType: String, startDate: Date, endDate : Date, dosage : String) {
        this.medicationUserID = medicationUserID,
        this.medicationType = medicationType,
        this.startDate = startDate,
        this.endDate = endDate,
        this.dosage = dosage
    }
}

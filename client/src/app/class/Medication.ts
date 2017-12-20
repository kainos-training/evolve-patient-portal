export class Medication {
    medicationUserID : number;
    medicationID : number;
    medicationName : String;
    medicationType : String;
    startDate : Date;
    endDate : Date;
    dosage : String;
    instructions: String;
    prescribedDate: Date;
    repeated: boolean;
    clinicianID: number;
    title: String;
    firstName: String;
    lastName: String;
    jobTitle: String;

    constructor(medicationUserID: number,
        medicationType: String,
        startDate: Date,
        endDate : Date,
        dosage : String,
        instructions: String,
        prescribedDate: Date,
        repeated: boolean,
        clinicianID: number,
        title: String,
        firstName: String,
        lastName: String,
        jobTitle: String) {
            this.medicationUserID = medicationUserID,
            this.medicationType = medicationType,
            this.startDate = startDate,
            this.endDate = endDate,
            this.dosage = dosage,
            this.instructions = instructions,
            this.prescribedDate = prescribedDate,
            this.repeated = repeated,
            this.clinicianID = clinicianID,
            this.title = title,
            this.firstName = firstName,
            this.lastName = lastName,
            this.jobTitle = jobTitle
    }
}

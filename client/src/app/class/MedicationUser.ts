export class MedicationUser {
    userID: number
    userMedicationID: number
    startDate: Date
    endDate: Date
    dosage: string
    prescribedDate: Date
    repeated: boolean
    delivery: boolean

    constructor(userID: number, userMedicationID: number, startDate: Date, endDate: Date, dosage: string, prescribedDate: Date, repeated: boolean, delivery: boolean) {
        this.userID = userID
        this.userMedicationID = userMedicationID
        this.startDate = startDate
        this.endDate = endDate
        this.dosage = dosage
        this.prescribedDate = prescribedDate
        this.repeated = repeated
        this.delivery = delivery

    }

}

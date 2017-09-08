export class MedicationComment {

    medicationUserCommentID : number;
    commentText : String;
    timeStamp: String;

    constructor(medicationUserCommentID: number, commentText: String, timeStamp: String) {
        this.medicationUserCommentID = medicationUserCommentID;
        this.commentText = commentText;
        this.timeStamp = timeStamp;
    }
}
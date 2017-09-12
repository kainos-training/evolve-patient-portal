export class SideEffect {
    userSideEffectID: number;
    userID: number;
    sideEffectText: String;
    timestamp: String;
    deleted: boolean;

    constructor(userSideEffectID: number,
        userID: number,
        sideEffectText: String,
        timestamp: String, deleted) {
            this.userSideEffectID = userSideEffectID;
            this.userID = userID;
            this.sideEffectText = sideEffectText;
            this.timestamp = timestamp;
            this.deleted = deleted;
    }
}

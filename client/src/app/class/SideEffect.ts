export class SideEffect {
    userSideEffectID: number;
    userID: number;
    sideEffectText: String;
    timestamp: String;

    constructor(userSideEffectID: number,
        userID: number,
        sideEffectText: String,
        timestamp: String) {
            this.userSideEffectID = userSideEffectID;
            this.userID = userID;
            this.sideEffectText = sideEffectText;
            this.timestamp = timestamp;
    }
}

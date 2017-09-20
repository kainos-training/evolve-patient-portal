export class Condition{
    userConditionID: number;
    condtionID: number;
    userID: number;
    conditionName: string;
    conditionLink: string;
    startDate: Date;
    endDate: Date;

    constructor(userConditionID: number, conditionID: number, userID: number, conditionName: string, conditionLink: string, startDate: Date, endDate: Date) {
        this.userConditionID = userConditionID,
        this.condtionID = conditionID,
        this.userID = userID,
        this.conditionName = conditionName,
        this.conditionLink = conditionLink,
        this.startDate = startDate,
        this.endDate = endDate
    }
}
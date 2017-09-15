export class Task {
    taskID: number;
    taskName : String;
    taskSummary : String;
    recievedDate : Date;
    dueDate : Date;

    constructor(taskName: String, recievedDate: Date, dueDate: Date) {
        this.taskName = taskName,
        this.recievedDate = recievedDate,
        this.dueDate = dueDate
    }
}
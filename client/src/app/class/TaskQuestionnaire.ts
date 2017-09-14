export class TaskQuestionnaire {
    taskID: number;
    answer : String;

    constructor(taskID: number, answer: String) {
        this.taskID = taskID,
        this.answer = answer
    }
}
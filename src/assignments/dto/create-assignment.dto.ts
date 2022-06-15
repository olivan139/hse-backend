export class CreateAssignmentDto {
    courseId : number;
    readonly deadlineType: "hw" | "cw";
    readonly assignmentName: string;
    readonly courseName: string;
    readonly desc: string;
    readonly deadlineTime: string;
    readonly submissionTime: string;
}
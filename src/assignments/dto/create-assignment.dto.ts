export class CreateAssignmentDto {
    readonly deadlineType: "hw" | "cw";
    readonly subjectName: string;
    readonly assignmentName: string;
    readonly courseName: string;
    readonly desc: string;
    readonly deadlineTime: string;
    readonly submissionTime: string;
}
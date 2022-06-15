export class CreateScheduleDto {
    readonly lessonType : "Lecture"   | "Seminar" | "Practice" | "Research";
    readonly isOnline : boolean;
    readonly lessonName : string;
    readonly groupId : number;
    readonly zoomLink : string;
    readonly address : string;
    readonly dayDate : string;
    readonly time : string;
}
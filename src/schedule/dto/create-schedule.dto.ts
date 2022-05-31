export class CreateScheduleDto {
    readonly lessonType : "Lecture"   | "Seminar" | "Practice" | "Research";
    isOnline : boolean;
    lessonName : string;
    zoomLink : string;
    address : string;
    dayDate : string;
    time : string;
}
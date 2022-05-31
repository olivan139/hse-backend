import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({tableName: 'schedule'})
export class Schedule extends Model<Schedule> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;
    @Column({type: DataType.ENUM("Lecture", "Seminar", "Practice", "Research"), allowNull: false})
    lessonType: "Lecture"   | "Seminar" | "Practice" | "Research";
    @Column({type: DataType.BOOLEAN, allowNull: false})
    isOnline: boolean;
    @Column({type: DataType.STRING, allowNull: false})
    lessonName: string;
    @Column({type: DataType.STRING, allowNull: true})
    zoomLink: string;
    @Column({type: DataType.STRING, allowNull: true})
    address: string;
    @Column({type: DataType.DATEONLY, allowNull: false})
    dayDate: string;
    @Column({type: DataType.DATE, allowNull: false})
    time: string;
}
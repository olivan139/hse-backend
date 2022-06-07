import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({tableName: 'assignments'})
export class Assignments extends Model<Assignments> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;
    @Column({type: DataType.ENUM("hw", "cw"), allowNull: false})
    deadlineType: "hw" | "cw";
    @Column({type: DataType.STRING, allowNull: false})
    subjectName: string;
    @Column({type: DataType.STRING, allowNull: false})
    assignmentName: string;
    @Column({type: DataType.STRING, allowNull: false})
    courseName: string;
    @Column({type: DataType.STRING, allowNull: true})
    desc: string;
    @Column({type: DataType.DATE, allowNull: false})
    deadlineTime: string;
    @Column({type: DataType.DATE, allowNull: false})
    submissionTime: string;
}
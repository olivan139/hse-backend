import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({tableName: 'assignments'})
export class Assignments extends Model<Assignments> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;
    @Column({type: DataType.ENUM("hw", "cw"), allowNull: false})
    deadlineType: "hw" | "cw";
    @Column({type: DataType.STRING, allowNull: false})
    assignmentName: string;
    @Column({type: DataType.STRING, allowNull: false})
    courseName: string;
    @Column({type: DataType.TEXT, allowNull: true})
    desc: string;
    @Column({type: DataType.DATE, allowNull: false})
    deadlineTime: string;
    @Column({type: DataType.DATE, allowNull: true})
    submissionTime: string;
    @Column({type : DataType.INTEGER, allowNull : false})
    submittedBy : number
    @Column({type: DataType.STRING, allowNull: false})
    submissionFiles: string;
    @Column({type : DataType.NUMBER, allowNull : true})
    grade : number
    
}
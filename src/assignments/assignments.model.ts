import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Course } from "src/courses/courses.model";
import { User } from "src/users/users.model";

@Table({tableName: 'assignments'})
export class Assignments extends Model<Assignments> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;
    @Column({type: DataType.ENUM("hw", "cw"), allowNull: false})
    deadlineType: "hw" | "cw";
    @Column({type: DataType.STRING, allowNull: false})
    assignmentName: string;
    @Column({type: DataType.TEXT, allowNull: true})
    desc: string;
    @Column({type: DataType.DATE, allowNull: false})
    deadlineTime: string;
    @Column({type: DataType.DATE, allowNull: true})
    submissionTime: string;
    @Column({type: DataType.STRING, allowNull: true})
    submissionFiles: string;
    @Column({type : DataType.INTEGER, allowNull : true})
    grade : number;
    @BelongsTo(() => Course)
    course : Course;
    @BelongsTo(() => User)
    author : User;
    @ForeignKey(() => User)
    userId: number
    @ForeignKey(() => Course)
    courseId: number
}
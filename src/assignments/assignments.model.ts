import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Course } from "src/courses/courses.model";
import { User } from "src/users/users.model";
import { UserAssignments } from "./user-assignments.model";

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
    @BelongsTo(() => Course)
    course : Course;
    @BelongsTo(() => User, 'authorId')
    author : User;
    @BelongsToMany(() => User, () => UserAssignments)
    students: User[];
    @ForeignKey(() => Course)
    courseId: number;
}
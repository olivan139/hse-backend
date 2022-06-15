import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Assignments } from "src/assignments/assignments.model";
import { User } from "src/users/users.model";
import { CourseMembers } from "./course-members.model";

@Table({tableName: 'courses'})
export class Course extends Model<Course> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;
    @Column({type: DataType.STRING, allowNull: false})
    courseName: string;
    @Column({type: DataType.TEXT, allowNull: false})
    courseDesc: string;
    @Column({type: DataType.STRING, allowNull: false})
    courseCode: string;
    @BelongsTo(() => User)
    owner : User;
    @ForeignKey(() => User)
    ownerId: number
    @BelongsToMany(()=> User, () => CourseMembers)
    members : User[];
    @HasMany(() => Assignments)
    assignments : Assignments[];
}
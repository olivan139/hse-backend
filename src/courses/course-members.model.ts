import {BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table} from "sequelize-typescript";
import { User } from "src/users/users.model";
import { Course } from "./courses.model";


@Table({tableName: 'course_members', createdAt : false, updatedAt : false})
export class CourseMembers extends Model<CourseMembers> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;
    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;

    @ForeignKey(() => Course)
    @Column({type: DataType.INTEGER})
    courseId: number;
}
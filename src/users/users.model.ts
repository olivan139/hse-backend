import {BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table} from "sequelize-typescript";
import { Assignments } from "src/assignments/assignments.model";
import { UserAssignments } from "src/assignments/user-assignments.model";
import { Chat } from "src/chats/chats.model";
import { UserMessages } from "src/chats/userMessages.model";
import { CourseMembers } from "src/courses/course-members.model";
import { Course } from "src/courses/courses.model";
import { Group } from "src/groups/groups.model";
import { Role } from "src/roles/roles.model";
import { UserRoles } from "src/roles/user-roles.model";

interface UserCreationAttrs {
    email: string;
    password: string;
    name: string;
    surname: string;
    faculty: string;
    group: string;
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;
    @Column({type: DataType.STRING, allowNull: false})
    password: string;
    @Column({type: DataType.STRING, allowNull: false})
    name: string;
    @Column({type: DataType.STRING, allowNull: false})
    surname: string;
    @Column({type: DataType.STRING, allowNull: true})
    patron: string;
    @ForeignKey(() => Group)
    @Column({type: DataType.INTEGER})
    groupId: number;
    @Column({type: DataType.STRING, allowNull: false})
    faculty: string;
    @Column({type: DataType.STRING, allowNull: true})
    pic: string;
    @Column({type: DataType.STRING, allowNull: true})
    currentRole: string;
    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[];
    @BelongsToMany(() => User, () => UserMessages)
    chats: Chat[];
    @BelongsToMany(()=> Course, () => CourseMembers)
    courses : Course[];
    @BelongsToMany(() => Assignments, () => UserAssignments)
    assignments: Assignments[];



}
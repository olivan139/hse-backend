import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "src/users/users.model";
import { Assignments } from "./assignments.model";


@Table({tableName: 'user_assignments', createdAt : false, updatedAt : false})
export class UserAssignments extends Model<UserAssignments> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => Assignments)
    @Column({type: DataType.INTEGER})
    roleId: number;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;

    @Column({type: DataType.INTEGER})
    grade: number;

    @Column({type: DataType.STRING, allowNull: true})
    file: string;
}
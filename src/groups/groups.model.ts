import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";

@Table({tableName: 'groups'})
export class Group extends Model<Group> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;
    @Column({type: DataType.STRING, allowNull: false})
    groupName: string;
}
import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { User } from "src/users/users.model";
import { UserMessages } from "./userMessages.model";

@Table({tableName: 'chats'})
export class Chat extends Model<Chat> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;
    @Column({type: DataType.INTEGER, allowNull: false})
    userId : number
    @Column({type: DataType.TEXT, allowNull: false})
    text: string;
    @Column({type: DataType.STRING, allowNull: true})
    imageURL: string;
}
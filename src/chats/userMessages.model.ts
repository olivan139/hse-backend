import {BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table} from "sequelize-typescript";
import { User } from "src/users/users.model";
import { Chat } from "./chats.model";


@Table({tableName: 'user_messages', createdAt : false, updatedAt : false})
export class UserMessages extends Model<UserMessages> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;
    @ForeignKey(() => Chat)
    @Column({type: DataType.INTEGER})
    chatId: number;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;
}
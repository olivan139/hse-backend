import {BelongsToMany, Column, DataType, HasMany, Model, Table} from "sequelize-typescript";
import { User } from "src/users/users.model";
import { UserRoles } from "./user-roles.model";

interface RoleCreationAttrs {
    role: string;
    desc: string;
}

@Table({tableName: 'roles', createdAt : false, updatedAt : false})
export class Role extends Model<Role, RoleCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    role: string;
    @Column({type: DataType.STRING, allowNull: false})
    desc: string;
    @BelongsToMany(() => User, () => UserRoles)
    users: User[]
}
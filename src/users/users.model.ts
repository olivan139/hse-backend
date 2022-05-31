import {BelongsToMany, Column, DataType, HasMany, Model, Table} from "sequelize-typescript";
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
    @Column({type: DataType.STRING, allowNull: false})
    faculty: string;
    @Column({type: DataType.STRING, allowNull: true})
    group: string;
    @Column({type: DataType.STRING, allowNull: true})
    pic: string;
    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[];


}
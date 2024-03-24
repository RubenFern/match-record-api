import { Table, Column, Model, DataType, Length, AllowNull, Unique } from 'sequelize-typescript';
const { v4: uuidv4 } = require('uuid');

@Table
export class User extends Model
{
    @Column({
        type: DataType.STRING(36),
        defaultValue: () => uuidv4(),
        primaryKey: true
    })
    id: string;

    @Column({
        type: DataType.STRING(70),
        allowNull: false
    })
    name: string;

    @Column({
        type: DataType.STRING(100),
        allowNull: false,
        unique: true
    })
    username: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true
    })
    email: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password: string;

    @Column({
        type: DataType.DATE,
        defaultValue: () => DataType.NOW    
    })
    createdAt: Date;
}
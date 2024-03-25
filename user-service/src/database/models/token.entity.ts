import { Column, DataType, Model, Table } from "sequelize-typescript";
const { v4: uuidv4 } = require('uuid');

@Table
export class Token extends Model
{
    @Column({
        type: DataType.STRING(36),
        defaultValue: () => uuidv4(),
        primaryKey: true
    })
    id: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true
    })
    token: string;

    @Column({
        type: DataType.STRING(36),
        allowNull: false,
    })
    userId: string;

    @Column({
        type: DataType.DATE,
        allowNull: false, 
    })
    createdAt: Date;

    @Column({
        type: DataType.DATE,
        allowNull: false, 
    })
    expiredAt: Date;
}
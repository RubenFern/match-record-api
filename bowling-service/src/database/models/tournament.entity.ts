import { Column, DataType, Model, Table } from "sequelize-typescript";
const { v4: uuidv4 } = require('uuid');

@Table
export class Tournament extends Model
{
    @Column({
        type: DataType.STRING(36),
        defaultValue: () => uuidv4(),
        primaryKey: true
    })
    id: string;
}
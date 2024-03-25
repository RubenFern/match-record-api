import { Column, DataType, Model, Table } from "sequelize-typescript";
const { v4: uuidv4 } = require('uuid');

@Table
export class Player extends Model
{
    @Column({
        type: DataType.STRING(36),
        defaultValue: () => uuidv4(),
        primaryKey: true
    })
    id: string;

    @Column({
        type: DataType.STRING(36)
    })
    id_team: string;

    @Column({
        type: DataType.STRING(80),
        allowNull: false
    })
    name: string;

    @Column({
        type: DataType.DATE,
        defaultValue: () => DataType.NOW    
    })
    createdAt: Date;
}
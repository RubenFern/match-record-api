import { Column, DataType, Model, Table } from "sequelize-typescript";
const { v4: uuidv4 } = require('uuid');

@Table
export class Team extends Model
{
    @Column({
        type: DataType.STRING(36),
        defaultValue: () => uuidv4(),
        primaryKey: true
    })
    id: string;

    @Column({
        type: DataType.STRING(80),
        allowNull: false,
        unique: true
    })
    name: string;

    @Column({
        type: DataType.STRING()
    })
    image: string;

    @Column({
        type: DataType.STRING(120)
    })
    ubication: string;

    @Column({
        type: DataType.INTEGER,
        defaultValue: () => new Date().getFullYear()    
    })
    foundationYear: number;
}
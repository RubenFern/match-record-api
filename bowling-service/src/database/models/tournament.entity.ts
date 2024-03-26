import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
const { v4: uuidv4 } = require('uuid');

import { Encounter } from "./encounter.entity";

@Table
export class Tournament extends Model
{
    @Column({
        type: DataType.STRING(36),
        defaultValue: () => uuidv4(),
        primaryKey: true
    })
    id: string;

    @Column({
        type: DataType.STRING(100),
        allowNull: false
    })
    name: string;

    @Column({
        type: DataType.STRING()
    })
    description: string;

    @Column({
        type: DataType.DATE
    })
    date: Date

    @HasMany(() => Encounter)
    encounters: Encounter[];
}
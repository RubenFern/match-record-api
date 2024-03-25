import { Column, DataType, Model, Table } from "sequelize-typescript";
const { v4: uuidv4 } = require('uuid');

@Table
export class Match extends Model
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
    id_encounter: string;

    @Column({
        type: DataType.INTEGER,
        defaultValue: () => 0
    })
    throw01: number;

    @Column({
        type: DataType.INTEGER,
        defaultValue: () => 0
    })
    throw02: number;

    @Column({
        type: DataType.INTEGER,
        defaultValue: () => 0
    })
    throw03: number;

    @Column({
        type: DataType.INTEGER,
        defaultValue: () => 0
    })
    throw04: number;

    @Column({
        type: DataType.INTEGER,
        defaultValue: () => 0
    })
    throw05: number;

    @Column({
        type: DataType.INTEGER,
        defaultValue: () => 0
    })
    throw06: number;

    @Column({
        type: DataType.INTEGER,
        defaultValue: () => 0
    })
    throw07: number;

    @Column({
        type: DataType.INTEGER,
        defaultValue: () => 0
    })
    throw08: number;

    @Column({
        type: DataType.INTEGER,
        defaultValue: () => 0
    })
    throw09: number;

    @Column({
        type: DataType.INTEGER,
        defaultValue: () => 0
    })
    throw10: number;

    @Column({
        type: DataType.DATE
    })
    date: Date;
}
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
const { v4: uuidv4 } = require('uuid');

import { Match } from "./match.entity";
import { Tournament } from './tournament.entity';

@Table
export class Encounter extends Model
{
    @Column({
        type: DataType.STRING(36),
        defaultValue: () => uuidv4(),
        primaryKey: true
    })
    id: string;

    @ForeignKey(() => Tournament)
    @Column({
        type: DataType.STRING(36)
    })
    tournamentId: string;

    @BelongsTo(() => Tournament)
    tournament: Tournament

    @Column({
        type: DataType.DATE
    })
    date: Date

    @HasMany(() => Match)
    matchs: Match[];
}
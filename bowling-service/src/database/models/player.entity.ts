import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
const { v4: uuidv4 } = require('uuid');

import { Team } from "./team.entity";
import { Match } from "./match.entity";

@Table
export class Player extends Model
{
    @Column({
        type: DataType.STRING(36),
        defaultValue: () => uuidv4(),
        primaryKey: true
    })
    id: string;

    @ForeignKey(() => Team)
    @Column({
        type: DataType.STRING(36)
    })
    teamId: string;

    @BelongsTo(() => Team)
    team: Team;

    @Column({
        type: DataType.STRING(80),
        allowNull: false
    })
    name: string;

    @Column({
        type: DataType.STRING(80),
        allowNull: false,
        unique: true
    })
    username: string;

    @Column({
        type: DataType.DATE,
        defaultValue: () => DataType.NOW    
    })
    createdAt: Date;

    @HasMany(() => Match)
    matches: Match[];
}
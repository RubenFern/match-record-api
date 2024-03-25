import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
const { v4: uuidv4 } = require('uuid');

import { Player } from "./player.entity";
import { Match } from "./match.entity";

@Table
export class PlayerPlayMatch extends Model
{
    @Column({
        type: DataType.STRING(36),
        defaultValue: () => uuidv4(),
        primaryKey: true
    })
    id: string;

    @ForeignKey(() => Player)
    @Column({
        type: DataType.STRING(36),
        allowNull: false
    })
    playerId: string;

    @ForeignKey(() => Match)
    @Column({
        type: DataType.STRING(36),
        allowNull: false
    })
    matchId: string;
}
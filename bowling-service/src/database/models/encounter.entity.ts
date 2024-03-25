import { Column, DataType, Model } from "sequelize-typescript";
const { v4: uuidv4 } = require('uuid');

export class Encounter extends Model
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
    id_tournament: string;
}
import { IsDate, IsNumber, IsString } from "class-validator";

export class MatchDto
{
    @IsString()
    id: string;

    @IsString()
    encounterId: string;

    @IsString()
    playerId: string;

    @IsNumber()
    throw01: number;

    @IsNumber()
    throw02: number;

    @IsNumber()
    throw03: number;

    @IsNumber()
    throw04: number;

    @IsNumber()
    throw05: number;

    @IsNumber()
    throw06: number;

    @IsNumber()
    throw07: number;

    @IsNumber()
    throw08: number;

    @IsNumber()
    throw09: number;

    @IsNumber()
    throw10: number;

    @IsDate()
    date: Date;
}
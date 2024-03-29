import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateMatchDto
{
    @IsString()
    readonly encounterId: string;

    @IsString()
    @IsNotEmpty()
    readonly playerId: string;

    @IsNumber()
    readonly throw01: number;

    @IsNumber()
    readonly throw02: number;

    @IsNumber()
    readonly throw03: number;

    @IsNumber()
    readonly throw04: number;

    @IsNumber()
    readonly throw05: number;

    @IsNumber()
    readonly throw06: number;

    @IsNumber()
    readonly throw07: number;

    @IsNumber()
    readonly throw08: number;

    @IsNumber()
    readonly throw09: number;

    @IsNumber()
    readonly throw10: number;
}
import { IsNotEmpty, IsString } from "class-validator";

export class CreateEncounterDto
{
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    readonly description: string;

    @IsString()
    readonly tournamentId: string;
}
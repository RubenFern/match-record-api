import { IsNotEmpty, IsString } from "class-validator";

export class CreateTournamentDto
{
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    readonly description: string;
}
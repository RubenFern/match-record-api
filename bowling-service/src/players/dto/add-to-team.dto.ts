import { IsNotEmpty, IsString } from "class-validator";

export class AddToTeamDto
{
    @IsString()
    @IsNotEmpty()
    readonly username: string;

    @IsString()
    @IsNotEmpty()
    readonly teamName: string;
}
import { IsNotEmpty, IsString } from "class-validator";

export class CreatePlayerDto 
{
    @IsString()
    @IsNotEmpty()
    readonly username: string;

    @IsString()
    @IsNotEmpty()
    readonly name: string;
}
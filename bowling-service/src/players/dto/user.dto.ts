import { IsNotEmpty, IsString } from "class-validator";

export class UserDto
{
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    readonly username: string;
}
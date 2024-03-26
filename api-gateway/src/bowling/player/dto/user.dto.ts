import { IsString } from "class-validator";

export class UserDto
{
    @IsString()
    id: string;

    @IsString()
    name: string;

    @IsString()
    username: string;

    @IsString()
    password: string;
}
import {
    IsString,
    IsNotEmpty,
    IsEmail,
    MinLength,
} from 'class-validator';

export class SignUpDto 
{
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    readonly username: string;

    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @MinLength(10)
    @IsNotEmpty()
    readonly password: string;
}
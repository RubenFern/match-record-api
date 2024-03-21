import {
    IsString,
    IsNotEmpty,
    MinLength,
} from 'class-validator';

export class SignInDto 
{
    @IsString()
    @IsNotEmpty()
    readonly username: string;

    @MinLength(10)
    @IsNotEmpty()
    readonly password: string;
}
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

    @MinLength(8)
    @IsNotEmpty()
    readonly password: string;
}
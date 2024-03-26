import {
    IsString,
    IsNotEmpty,
    IsNumber,
} from 'class-validator';

export class CreateTeamDto 
{
    @IsString()
    @IsNotEmpty()
    readonly owner: string;

    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    readonly image: string;

    @IsString()
    readonly ubication: string;

    @IsNumber()
    readonly foundationYear: number;
}
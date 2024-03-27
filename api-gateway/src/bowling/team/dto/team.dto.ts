import { IsString } from "class-validator";

export class TeamDto
{
    @IsString()
    id: string;

    @IsString()
    owner: string;

    @IsString()
    name: string;

    @IsString()
    image: string;

    @IsString()
    ubication: string;

    @IsString()
    foundationYear: string;
}
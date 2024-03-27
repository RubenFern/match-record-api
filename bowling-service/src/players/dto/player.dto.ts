import { IsString } from "class-validator";

export class PlayerDto
{
    @IsString()
    id: string;

    @IsString()
    teamId: string;

    @IsString()
    name: string;

    @IsString()
    username: string;

    @IsString()
    createdAt: Date;
}
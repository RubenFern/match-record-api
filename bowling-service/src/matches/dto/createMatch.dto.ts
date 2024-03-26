import { IsNotEmpty, IsString } from "class-validator";

export class CreateMatchDto
{
    @IsString()
    readonly encounterId: string;

    @IsString()
    @IsNotEmpty()
    readonly playerId: string;
}
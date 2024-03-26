import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { extractTokenFromHeader } from "src/helpers/extractTokenFromHeader";

@Injectable()
export class AuthGuard implements CanActivate
{
    constructor(private readonly jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> 
    {
        const request = context.switchToHttp().getRequest();
        const token = extractTokenFromHeader(request);

        if (!token)
            throw new UnauthorizedException();

        try {
            const payload = await this.jwtService.verifyAsync(token, { secret: process.env.SECRET_KEY_TOKEN });
            
            request['user'] = payload;
        }
        catch {
            throw new UnauthorizedException();
        }

        return true;
    }
}
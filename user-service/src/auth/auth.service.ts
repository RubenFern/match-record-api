import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { genSalt, hash, compare } from 'bcrypt';

import { UsersService } from 'src/users/users.service';
import { SignUpDto } from './dto/signUp.dto';
import { SignInDto } from './dto/signIn.dto';
import { extractTokenFromHeader } from './helpers/extractTokenFromHeader';
import { TokenService } from 'src/tokens/token.service';
import { Request } from 'express';

@Injectable()
export class AuthService 
{
    constructor(
        private readonly usersService: UsersService,
        private readonly tokensService: TokenService,
        private readonly jwtService: JwtService
    ) {}

    async signIn(signInDto: SignInDto): Promise<{ token: string } | { error: string }>
    {
        const user = await this.usersService.findOne(signInDto.username);
    
        if (!user || !(await compare(signInDto.password, user.password)))
            throw new UnauthorizedException('Username or password incorrects');

        const payload = { username: user.username };

        return { token: await this.jwtService.signAsync(payload) };
    }
    
    async signUp(signUpDto: SignUpDto): Promise<{ token: string } | { error: string }>
    {
        try {
            const user = await this.usersService.save(
                signUpDto.name, 
                signUpDto.username, 
                signUpDto.email, 
                await this.hashPassowrd(signUpDto.password));

            const payload = { username: user.username };

            return { token: await this.jwtService.signAsync(payload) };
        }
        catch (error) {
            return { error: error.errors[0].message };
        }
    }

    async logout(request: Request): Promise<{ message: string } | { error: string }>
    {
        const token = extractTokenFromHeader(request);

        if (!token)
            throw new UnauthorizedException();

        const payload = await this.jwtService.verifyAsync(token, { secret: process.env.SECRET_KEY_TOKEN });
        
        const user = await this.usersService.findOne(payload.username);

        try {
            const token_ = await this.tokensService.save(token, user.id, payload.iat, payload.exp);

            return { message: 'The token ' + token_.token + ' has been invalidated' }
        }
        catch (error) {
            return { error: 'Ha ocurrido un error' };
        }
    }

    private async hashPassowrd(password: string): Promise<string>
    {
        const salt = await genSalt(10);
        
        return await hash(password, salt);
    }
}
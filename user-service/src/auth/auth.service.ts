import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from 'src/users/users.service';
import { genSalt, hash, compare } from 'bcrypt';

@Injectable()
export class AuthService 
{
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) {}

    async signIn(username: string, password: string): Promise<{ token: string }>
    {
        const user = await this.usersService.findOne(username);
        const hasPassword = hashPassowrd(password);

        if (!user && !(await compare(hasPassword, user.password)))
            throw new UnauthorizedException();

        const payload = { username: user.username };

        return { token: await this.jwtService.signAsync(payload) };
    }
}

const hashPassowrd = async (password: string) => 
{
    const salt = await genSalt(10);
    
    return await hash(password, salt);
}
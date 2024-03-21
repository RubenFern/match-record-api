import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from 'src/users/users.service';
import { genSalt, hash, compare } from 'bcrypt';
import { SignUpDto } from './dto/signUp.dto';
import { SignInDto } from './dto/signIn.dto';

@Injectable()
export class AuthService 
{
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) {}

    async signIn(signInDto: SignInDto): Promise<{ token: string }>
    {
        const user = await this.usersService.findOne(signInDto.username);
        const hasPassword = hashPassowrd(signInDto.password);

        if (!user && !(await compare(hasPassword, user.password)))
            throw new UnauthorizedException();

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
                await hashPassowrd(signUpDto.password));

            const payload = { username: user.username };

            return { token: await this.jwtService.signAsync(payload) };
        }
        catch (error) {
            return { error: error.errors[0].message };
        }
    }
}

const hashPassowrd = async (password: string) => 
{
    const salt = await genSalt(10);
    
    return await hash(password, salt);
}
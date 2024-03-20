import { Inject, Injectable } from "@nestjs/common";

import { USERS_REPOSITORY } from "src/constants";
import { User } from "./user.entity";
import { CreateUserDto } from './dto/create.dto';
import { genSalt, hash, compare } from 'bcrypt';

@Injectable()
export class UsersService
{
    constructor(
        @Inject(USERS_REPOSITORY)
        private readonly usersRepository: typeof User
    ) {}

    async add(createUserDto: CreateUserDto): Promise<User>
    {
        const user = new User();
        user.name = createUserDto.name;
        user.username = createUserDto.username;
        user.email = createUserDto.email;
        user.password = await hashPassowrd(createUserDto.password);

        const userData = await user.save();

        return userData;
    }

    async findAll(): Promise<User[]> 
    {
        return await this.usersRepository.findAll<User>();
    }
}

const hashPassowrd = async (password: string) => 
{
    const salt = await genSalt(10);
    
    return await hash(password, salt);
}
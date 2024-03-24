import { Sequelize } from 'sequelize-typescript';

import { User } from 'src/users/user.entity';
import { Token } from 'src/token/token.entity';

export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async () => 
        {
            const sequelize = new Sequelize('users-db', 'root', process.env.MARIADB_PASSWORD, { 
                dialect: 'mariadb',
                host: process.env.MARIADB_HOST,
                port: parseInt(process.env.MARIADB_PORT),
            });

            try {
                await sequelize.authenticate();
                console.log('Connection has been established successfully.');
            } catch (error) {
                console.error('Unable to connect to the database: ', error);
            }

            sequelize.addModels([User, Token]);
            await sequelize.sync();

            return sequelize;
        },
    },
];
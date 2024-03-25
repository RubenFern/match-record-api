import { Sequelize } from 'sequelize-typescript';

import { Team } from './models/team.entity';
import { Player } from './models/player.entity';
import { Tournament } from './models/tournament.entity';
import { Match } from './models/match.entity';
import { Encounter } from './models/encounter.entity';
import { PlayerPlayMatch } from './models/player_play_match.entity';

export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async () => 
        {
            const sequelize = new Sequelize('bowling-db', 'root', process.env.MARIADB_PASSWORD, { 
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

            sequelize.addModels([Team, Player, Encounter, Tournament, Match, PlayerPlayMatch]);
            await sequelize.sync();

            return sequelize;
        },
    },
];
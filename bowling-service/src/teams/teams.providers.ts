import { TEAMS_REPOSITORY } from "src/constants";

import { Team } from "src/database/models/team.entity";

export const teamsProviders = [
    {
        provide: TEAMS_REPOSITORY,
        useValue: Team
    }
]
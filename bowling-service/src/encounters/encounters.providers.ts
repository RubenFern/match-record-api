import { ENCOUNTERS_REPOSITORY } from "src/constants";

import { Encounter } from "src/database/models/encounter.entity";

export const encountersProviders = [
    {
        provide: ENCOUNTERS_REPOSITORY,
        useValue: Encounter
    }
]
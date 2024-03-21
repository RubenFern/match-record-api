import { TOKENS_REPOSITORY } from "src/constants";
import { Token } from "./token.entity";

export const tokensProviders = [
    {
        provide: TOKENS_REPOSITORY,
        useValue: Token
    }
]
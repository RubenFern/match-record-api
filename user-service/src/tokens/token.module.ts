import { Module } from "@nestjs/common";

import { DatabaseModule } from "src/database/database.module";
import { TokenService } from "./token.service";
import { tokensProviders } from "./token.provider";

@Module({
    imports: [DatabaseModule],
    controllers: [],
    providers: [
        TokenService,
        ...tokensProviders
    ],
    exports: [TokenService]
})
export class TokensModule {}
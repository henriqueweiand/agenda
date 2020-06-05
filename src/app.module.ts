import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AccountModule } from './modules/account/account.module';
import * as ormconfig from './ormconfig';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRootAsync({
            useFactory: async () => ormconfig,
        }),
        GraphQLModule.forRoot({
            autoSchemaFile: true,
            context: ({ req }) => ({ req }),
        }),
        AccountModule,
    ],
    providers: [],
})
export class AppModule {}

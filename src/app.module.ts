import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountModule } from './modules/account/account.module';
import { AuthModule } from './modules/auth/auth.module';
import { EstablishmentModule } from './modules/establishment/establishment.module';
import { HandbookModule } from './modules/handbook/handbook.module';
import { NetworkModule } from './modules/network/network.module';
import { SchedulingModule } from './modules/scheduling/scheduling.module';
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
        NetworkModule,
        EstablishmentModule,
        SchedulingModule,
        HandbookModule,
        AuthModule,
    ],
    providers: [],
})
export class AppModule {}

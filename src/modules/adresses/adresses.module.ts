import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MappedExceptionModule } from 'nestjs-mapped-exception';
import { Account } from '../account/account.entity';
import { AccountService } from '../account/account.service';
import { Adresses } from './adresses.entity';
import { AdressesException } from './adresses.exception';
import { AdressesResolver } from './adresses.resolver';
import { AdressesService } from './adresses.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Adresses, Account]),
        MappedExceptionModule.forFeature(AdressesException, {
            prefix: 'ADD_ERROR_',
        }),
    ],
    providers: [AdressesResolver, AdressesService, AccountService],
    exports: [AdressesService],
})
export class AdressesModule {}

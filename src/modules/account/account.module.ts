import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MappedExceptionModule } from 'nestjs-mapped-exception';
import { Adresses } from '../adresses/adresses.entity';
import { AdressesService } from '../adresses/adresses.service';
import { Account } from './account.entity';
import { AccountException } from './account.exception';
import { AccountResolver } from './account.resolver';
import { AccountService } from './account.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Account, Adresses]),
        MappedExceptionModule.forFeature(AccountException, {
            prefix: 'ACC_ERROR_',
        }),
    ],
    providers: [
        AccountException,
        AccountResolver,
        AccountService,
        AdressesService,
    ],
    exports: [AccountService],
})
export class AccountModule {}

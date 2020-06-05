import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './account.entity';
import { AccountResolver } from './account.resolver';
import { AccountService } from './account.service';

import { AccountException } from './account.exception';
import { MappedExceptionModule } from 'nestjs-mapped-exception';
import { AdressesModule } from '../adresses/adresses.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Account]),
        MappedExceptionModule.forFeature(AccountException, {
            prefix: 'ACC_ERROR_',
        }),
        AdressesModule,
    ],
    providers: [AccountException, AccountResolver, AccountService],
    exports: [AccountService],
})
export class AccountModule {}

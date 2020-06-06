import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MappedExceptionModule } from 'nestjs-mapped-exception';
import { Account } from '../account/account.entity';
import { AccountService } from '../account/account.service';
import { AccountContact } from './accountContact.entity';
import { AccountContactException } from './accountContact.exception';
import { AccountContactResolver } from './accountContact.resolver';
import { AccountContactService } from './accountContact.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([AccountContact, Account]),
        MappedExceptionModule.forFeature(AccountContactException, {
            prefix: 'ACC_CON_ERROR_',
        }),
    ],
    providers: [AccountContactResolver, AccountContactService, AccountService],
    exports: [AccountContactService],
})
export class AccountContactModule {}

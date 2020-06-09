import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MappedExceptionModule } from 'nestjs-mapped-exception';
import { AccountContactModule } from '../accountContact/accountContact.module';
import { AdressesModule } from '../adresses/adresses.module';
import { AttachmentModule } from '../attachment/attachment.module';
import { NetworkModule } from '../network/network.module';
import { Account } from './account.entity';
import { AccountException } from './account.exception';
import { AccountResolver } from './account.resolver';
import { AccountService } from './account.service';
import { SchedulingModule } from '../scheduling/scheduling.module';
import { AccountNetworkModule } from '../accountNetwork/accountNetwork.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Account]),
        MappedExceptionModule.forFeature(AccountException, {
            prefix: 'ACC_ERROR_',
        }),
        AccountContactModule,
        NetworkModule,
        AttachmentModule,
        AdressesModule,
        SchedulingModule,
        AccountNetworkModule,
    ],
    providers: [AccountException, AccountResolver, AccountService],
    exports: [AccountService],
})
export class AccountModule {}

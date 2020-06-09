import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MappedExceptionModule } from 'nestjs-mapped-exception';
import { Account } from '../account/account.entity';
import { AccountService } from '../account/account.service';
import { AccountNetwork } from './accountNetwork.entity';
import { AccountNetworkException } from './accountNetwork.exception';
import { AccountNetworkResolver } from './accountNetwork.resolver';
import { AccountNetworkService } from './accountNetwork.service';
import { NetworkModule } from '../network/network.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([AccountNetwork, Account]),
        MappedExceptionModule.forFeature(AccountNetworkException, {
            prefix: 'ACC_NET_ADD_ERROR_',
        }),
        NetworkModule,
    ],
    providers: [AccountNetworkResolver, AccountNetworkService, AccountService],
    exports: [AccountNetworkService],
})
export class AccountNetworkModule {}

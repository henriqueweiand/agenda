import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from '../account/account.entity';
import { AccountService } from '../account/account.service';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { MappedExceptionModule } from 'nestjs-mapped-exception';
import { AccountException } from '../account/account.exception';

@Module({
    imports: [
        TypeOrmModule.forFeature([Account]),
        MappedExceptionModule.forFeature(AccountException, {
            prefix: 'AUT_ERROR_',
        }),
    ],
    providers: [AuthResolver, AuthService, AccountService, JwtStrategy],
    exports: [AuthService],
})
export class AuthModule {}

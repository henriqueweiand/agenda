import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MappedExceptionModule } from 'nestjs-mapped-exception';
import { EstablishmentService } from '../establishment/establishment.service';
import { Network } from './network.entity';
import { NetworkException } from './network.exception';
import { NetworkResolver } from './network.resolver';
import { NetworkService } from './network.service';
import { Establishment } from '../establishment/establishment.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Network, Establishment]),
        MappedExceptionModule.forFeature(NetworkException, {
            prefix: 'NET_ERROR_',
        }),
    ],
    providers: [
        NetworkException,
        NetworkResolver,
        NetworkService,
        EstablishmentService,
    ],
    exports: [NetworkService],
})
export class NetworkModule {}

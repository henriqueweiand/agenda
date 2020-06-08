import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MappedExceptionModule } from 'nestjs-mapped-exception';
import { NetworkService } from '../network/network.service';
import { Establishment } from './establishment.entity';
import { EstablishmentException } from './establishment.exception';
import { EstablishmentResolver } from './establishment.resolver';
import { EstablishmentService } from './establishment.service';
import { Network } from '../network/network.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Establishment, Network]),
        MappedExceptionModule.forFeature(EstablishmentException, {
            prefix: 'EST_ERROR_',
        }),
    ],
    providers: [
        EstablishmentException,
        EstablishmentResolver,
        EstablishmentService,
        NetworkService,
    ],
    exports: [EstablishmentService],
})
export class EstablishmentModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MappedExceptionModule } from 'nestjs-mapped-exception';
import { Account } from '../account/account.entity';
import { AccountService } from '../account/account.service';
import { Establishment } from '../establishment/establishment.entity';
import { EstablishmentService } from '../establishment/establishment.service';
import { Scheduling } from './scheduling.entity';
import { SchedulingException } from './scheduling.exception';
import { SchedulingResolver } from './scheduling.resolver';
import { SchedulingService } from './scheduling.service';
import { HandbookService } from '../handbook/handbook.service';
import { Handbook } from '../handbook/handbook.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Scheduling,
            Establishment,
            Account,
            Handbook,
        ]),
        MappedExceptionModule.forFeature(SchedulingException, {
            prefix: 'SCH_ERROR_',
        }),
    ],
    providers: [
        SchedulingException,
        SchedulingResolver,
        SchedulingService,
        EstablishmentService,
        AccountService,
        HandbookService,
    ],
    exports: [SchedulingService],
})
export class SchedulingModule {}

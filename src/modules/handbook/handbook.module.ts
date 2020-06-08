import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MappedExceptionModule } from 'nestjs-mapped-exception';
import { Account } from '../account/account.entity';
import { AccountService } from '../account/account.service';
import { Establishment } from '../establishment/establishment.entity';
import { Scheduling } from '../scheduling/scheduling.entity';
import { SchedulingService } from '../scheduling/scheduling.service';
import { Handbook } from './handbook.entity';
import { HandbookException } from './handbook.exception';
import { HandbookResolver } from './handbook.resolver';
import { HandbookService } from './handbook.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Handbook,
            Establishment,
            Scheduling,
            Account,
        ]),
        MappedExceptionModule.forFeature(HandbookException, {
            prefix: 'HAN_ERROR_',
        }),
    ],
    providers: [
        HandbookException,
        HandbookResolver,
        HandbookService,
        SchedulingService,
        AccountService,
    ],
    exports: [HandbookService],
})
export class HandbookModule {}

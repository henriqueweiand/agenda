import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MappedExceptionModule } from 'nestjs-mapped-exception';
import { Account } from '../account/account.entity';
import { AccountService } from '../account/account.service';
import { Establishment } from '../establishment/establishment.entity';
import { Scheduling } from '../scheduling/scheduling.entity';
import { SchedulingService } from '../scheduling/scheduling.service';
import { Attachment } from './attachment.entity';
import { AttachmentException } from './attachment.exception';
import { AttachmentResolver } from './attachment.resolver';
import { AttachmentService } from './attachment.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Attachment,
            Establishment,
            Scheduling,
            Account,
        ]),
        MappedExceptionModule.forFeature(AttachmentException, {
            prefix: 'ATT_ERROR_',
        }),
    ],
    providers: [
        AttachmentException,
        AttachmentResolver,
        AttachmentService,
        SchedulingService,
        AccountService,
    ],
    exports: [AttachmentService],
})
export class AttachmentModule {}

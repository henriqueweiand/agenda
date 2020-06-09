import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { format } from 'date-fns';
import { MappedException } from 'nestjs-mapped-exception';
import { FindManyOptions, Like, Repository } from 'typeorm';
import { Attachment } from './attachment.entity';
import { AttachmentException } from './attachment.exception';
import { GetAllAttachmentType } from './types/GetAllAttachment.type';

@Injectable()
export class AttachmentService {
    constructor(
        @InjectRepository(Attachment)
        private attachmentRepository: Repository<Attachment>,
        private readonly exception: MappedException<AttachmentException>,
    ) {}

    async getAttachments(filters: GetAllAttachmentType): Promise<Attachment[]> {
        const conditions: FindManyOptions<Attachment> = {
            take: filters.take,
            skip: filters.skip,
        };

        if (filters.search) {
            conditions.where = { title: Like('%' + filters.search + '%') };
        }

        return await this.attachmentRepository.find({
            ...conditions,
            withDeleted: false,
        });
    }

    public async getById(id: string): Promise<Attachment> {
        const attachment = await this.attachmentRepository.findOne({
            where: { id },
            withDeleted: false,
        });
        if (!attachment) {
            this.exception.ERRORS.NOT_FOUND.throw();
        }

        return attachment;
    }

    public async getByAccount(id: string): Promise<Attachment[]> {
        const attachment = await this.attachmentRepository.find({
            where: { account: id },
            withDeleted: false,
        });

        return attachment;
    }

    public async getByNetwork(id: string): Promise<Attachment[]> {
        const attachment = await this.attachmentRepository.find({
            where: { network: id },
            withDeleted: false,
        });

        return attachment;
    }

    async createAndSave(createAttachmentInput: Attachment) {
        const attachment = this.attachmentRepository.create(
            createAttachmentInput,
        );

        return await this.attachmentRepository.save(attachment);
    }

    async update(
        attachment: Attachment,
        attachmentUpdateData: Attachment,
    ): Promise<Attachment> {
        const attachmentUpdate = this.attachmentRepository.merge(
            attachment,
            attachmentUpdateData,
        );

        return await this.attachmentRepository.save(attachmentUpdate);
    }

    async delete(attachment: Attachment): Promise<boolean> {
        attachment.deletedAt = format(new Date(), 'yyyy-MM-dd');
        await this.attachmentRepository.save(attachment);

        return true;
    }
}

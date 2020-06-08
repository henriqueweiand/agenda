import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { format } from 'date-fns';
import { MappedException } from 'nestjs-mapped-exception';
import { FindManyOptions, Like, Repository } from 'typeorm';
import { Handbook } from './handbook.entity';
import { HandbookException } from './handbook.exception';
import { GetAllHandbookType } from './types/GetAllHandbook.type';

@Injectable()
export class HandbookService {
    constructor(
        @InjectRepository(Handbook)
        private handbookRepository: Repository<Handbook>,
        private readonly exception: MappedException<HandbookException>,
    ) {}

    async getHandbooks(filters: GetAllHandbookType): Promise<Handbook[]> {
        const conditions: FindManyOptions<Handbook> = {
            take: filters.take,
            skip: filters.skip,
        };

        if (filters.search) {
            conditions.where = { title: Like('%' + filters.search + '%') };
        }

        return await this.handbookRepository.find({
            ...conditions,
            withDeleted: false,
        });
    }

    public async getById(id: string): Promise<Handbook> {
        const handbook = await this.handbookRepository.findOne({
            where: { id },
            withDeleted: false,
        });
        if (!handbook) {
            this.exception.ERRORS.NOT_FOUND.throw();
        }

        return handbook;
    }

    public async getByNetwork(id: string): Promise<Handbook[]> {
        const handbook = await this.handbookRepository.find({
            where: { network: id },
            withDeleted: false,
        });

        return handbook;
    }

    async createAndSave(createHandbookInput: Handbook) {
        const handbook = this.handbookRepository.create(createHandbookInput);

        return await this.handbookRepository.save(handbook);
    }

    async update(
        handbook: Handbook,
        handbookUpdateData: Handbook,
    ): Promise<Handbook> {
        const handbookUpdate = this.handbookRepository.merge(
            handbook,
            handbookUpdateData,
        );

        return await this.handbookRepository.save(handbookUpdate);
    }

    async delete(handbook: Handbook): Promise<boolean> {
        handbook.deletedAt = format(new Date(), 'yyyy-MM-dd');
        await this.handbookRepository.save(handbook);

        return true;
    }
}

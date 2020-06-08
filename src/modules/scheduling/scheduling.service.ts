import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { format } from 'date-fns';
import { MappedException } from 'nestjs-mapped-exception';
import { FindManyOptions, Like, Repository } from 'typeorm';
import { Scheduling } from './scheduling.entity';
import { SchedulingException } from './scheduling.exception';
import { GetAllSchedulingType } from './types/GetAllScheduling.type';

@Injectable()
export class SchedulingService {
    constructor(
        @InjectRepository(Scheduling)
        private schedulingRepository: Repository<Scheduling>,
        private readonly exception: MappedException<SchedulingException>,
    ) {}

    async getSchedulings(filters: GetAllSchedulingType): Promise<Scheduling[]> {
        const conditions: FindManyOptions<Scheduling> = {
            take: filters.take,
            skip: filters.skip,
        };

        if (filters.search) {
            conditions.where = { title: Like('%' + filters.search + '%') };
        }

        return await this.schedulingRepository.find({
            ...conditions,
            withDeleted: false,
        });
    }

    public async getById(id: string): Promise<Scheduling> {
        const scheduling = await this.schedulingRepository.findOne({
            where: { id },
            withDeleted: false,
        });
        if (!scheduling) {
            this.exception.ERRORS.NOT_FOUND.throw();
        }

        return scheduling;
    }

    public async getByHandEstablishment(id: string): Promise<Scheduling[]> {
        const scheduling = await this.schedulingRepository.find({
            where: { establishment: id },
            withDeleted: false,
        });

        return scheduling;
    }

    public async getByHandbook(id: string): Promise<Scheduling[]> {
        const scheduling = await this.schedulingRepository.find({
            where: { handbook: id },
            withDeleted: false,
        });

        return scheduling;
    }

    async createAndSave(createSchedulingInput: Scheduling) {
        const scheduling = this.schedulingRepository.create(
            createSchedulingInput,
        );

        return await this.schedulingRepository.save(scheduling);
    }

    async update(
        scheduling: Scheduling,
        schedulingUpdateData: Scheduling,
    ): Promise<Scheduling> {
        const schedulingUpdate = this.schedulingRepository.merge(
            scheduling,
            schedulingUpdateData,
        );

        return await this.schedulingRepository.save(schedulingUpdate);
    }

    async delete(scheduling: Scheduling): Promise<boolean> {
        scheduling.deletedAt = format(new Date(), 'yyyy-MM-dd');
        await this.schedulingRepository.save(scheduling);

        return true;
    }
}

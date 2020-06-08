import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { format } from 'date-fns';
import { MappedException } from 'nestjs-mapped-exception';
import { FindManyOptions, Like, Repository } from 'typeorm';
import { Establishment } from './establishment.entity';
import { EstablishmentException } from './establishment.exception';
import { GetAllEstablishmentType } from './types/GetAllEstablishment.type';

@Injectable()
export class EstablishmentService {
    constructor(
        @InjectRepository(Establishment)
        private establishmentRepository: Repository<Establishment>,
        private readonly exception: MappedException<EstablishmentException>,
    ) {}

    async getEstablishments(
        filters: GetAllEstablishmentType,
    ): Promise<Establishment[]> {
        const conditions: FindManyOptions<Establishment> = {
            take: filters.take,
            skip: filters.skip,
        };

        if (filters.search) {
            conditions.where = { name: Like('%' + filters.search + '%') };
        }

        return await this.establishmentRepository.find({
            ...conditions,
            withDeleted: false,
        });
    }

    public async getById(id: string): Promise<Establishment> {
        const establishment = await this.establishmentRepository.findOne({
            where: { id },
            withDeleted: false,
        });
        if (!establishment) {
            this.exception.ERRORS.NOT_FOUND.throw();
        }

        return establishment;
    }

    public async getByNetwork(id: string): Promise<Establishment[]> {
        const establishment = await this.establishmentRepository.find({
            where: { network: id },
            withDeleted: false,
        });

        return establishment;
    }

    async createAndSave(createEstablishmentInput: Establishment) {
        const establishment = this.establishmentRepository.create(
            createEstablishmentInput,
        );

        return await this.establishmentRepository.save(establishment);
    }

    async update(
        establishment: Establishment,
        establishmentUpdateData: Establishment,
    ): Promise<Establishment> {
        const establishmentUpdate = this.establishmentRepository.merge(
            establishment,
            establishmentUpdateData,
        );

        return await this.establishmentRepository.save(establishmentUpdate);
    }

    async delete(establishment: Establishment): Promise<boolean> {
        establishment.deletedAt = format(new Date(), 'yyyy-MM-dd');
        await this.establishmentRepository.save(establishment);

        return true;
    }
}

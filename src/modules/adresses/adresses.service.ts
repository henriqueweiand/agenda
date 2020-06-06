import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Like, Repository } from 'typeorm';
import { Adresses } from './adresses.entity';
import { GetAllAdressesType } from './types/GetAllAdresses.type';
import { format } from 'date-fns';

@Injectable()
export class AdressesService {
    constructor(
        @InjectRepository(Adresses)
        private adressesRepository: Repository<Adresses>,
    ) {}

    async getAdresses(filters: GetAllAdressesType): Promise<Adresses[]> {
        const conditions: FindManyOptions<Adresses> = {
            take: filters.take,
            skip: filters.skip,
        };

        if (filters.search) {
            conditions.where = { address: Like('%' + filters.search + '%') };
        }

        return await this.adressesRepository.find({
            ...conditions,
            withDeleted: false,
        });
    }

    public async getById(id: string): Promise<Adresses> {
        return await this.adressesRepository.findOne({ id });
    }

    public async getByAccount(id: string): Promise<Adresses[]> {
        return await this.adressesRepository.find({ where: { account: id } });
    }

    async createAndSave(createAdresseInput: Adresses) {
        const account = this.adressesRepository.create(createAdresseInput);

        return await this.adressesRepository.save(account);
    }

    async update(
        adresses: Adresses,
        adressesUpdateData: Omit<Adresses, 'account'>,
    ): Promise<Adresses> {
        const accountUpdate = this.adressesRepository.merge(
            adresses,
            adressesUpdateData,
        );

        return await this.adressesRepository.save(accountUpdate);
    }

    async delete(adresse: Adresses): Promise<boolean> {
        adresse.deletedAt = format(new Date(), 'yyyy-MM-dd');
        await this.adressesRepository.save(adresse);

        return true;
    }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Like, Repository } from 'typeorm';
import { AccountContact } from './accountContact.entity';
import { GetAllAccountContactType } from './types/GetAllAccountContact.type';
import { format } from 'date-fns';

@Injectable()
export class AccountContactService {
    constructor(
        @InjectRepository(AccountContact)
        private accountContactRepository: Repository<AccountContact>,
    ) {}

    async getAccountContact(
        filters: GetAllAccountContactType,
    ): Promise<AccountContact[]> {
        const conditions: FindManyOptions<AccountContact> = {
            take: filters.take,
            skip: filters.skip,
        };

        if (filters.search) {
            conditions.where = { value: Like('%' + filters.search + '%') };
        }

        return await this.accountContactRepository.find({
            ...conditions,
            withDeleted: false,
        });
    }

    public async getById(id: string): Promise<AccountContact> {
        return await this.accountContactRepository.findOne({ id });
    }

    public async getByAccount(id: string): Promise<AccountContact[]> {
        return await this.accountContactRepository.find({
            where: { account: id },
        });
    }

    async createAndSave(createAdresseInput: AccountContact) {
        const account = this.accountContactRepository.create(
            createAdresseInput,
        );

        return await this.accountContactRepository.save(account);
    }

    async update(
        accountContact: AccountContact,
        accountContactUpdateData: Omit<AccountContact, 'account'>,
    ): Promise<AccountContact> {
        const accountUpdate = this.accountContactRepository.merge(
            accountContact,
            accountContactUpdateData,
        );

        return await this.accountContactRepository.save(accountUpdate);
    }

    async delete(adresse: AccountContact): Promise<boolean> {
        adresse.deletedAt = format(new Date(), 'yyyy-MM-dd');
        await this.accountContactRepository.save(adresse);

        return true;
    }
}

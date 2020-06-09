import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Like, Repository } from 'typeorm';
import { AccountNetwork } from './accountNetwork.entity';
import { GetAllAccountNetworkType } from './types/GetAllAccountNetwork.type';
import { format } from 'date-fns';

@Injectable()
export class AccountNetworkService {
    constructor(
        @InjectRepository(AccountNetwork)
        private accountNetworkRepository: Repository<AccountNetwork>,
    ) {}

    async getAccountNetwork(
        filters: GetAllAccountNetworkType,
    ): Promise<AccountNetwork[]> {
        const conditions: FindManyOptions<AccountNetwork> = {
            take: filters.take,
            skip: filters.skip,
        };

        if (filters.search) {
            conditions.where = { account: Like('%' + filters.search + '%') };
        }

        return await this.accountNetworkRepository.find({
            ...conditions,
            withDeleted: false,
        });
    }

    public async getById(id: string): Promise<AccountNetwork> {
        return await this.accountNetworkRepository.findOne({ id });
    }

    public async getByAccount(id: string): Promise<AccountNetwork[]> {
        return await this.accountNetworkRepository.find({
            where: { account: id },
        });
    }

    async createAndSave(createAdresseInput: AccountNetwork) {
        const account = this.accountNetworkRepository.create(
            createAdresseInput,
        );

        return await this.accountNetworkRepository.save(account);
    }

    async update(
        accountNetwork: AccountNetwork,
        accountNetworkUpdateData: Omit<AccountNetwork, 'account'>,
    ): Promise<AccountNetwork> {
        const accountUpdate = this.accountNetworkRepository.merge(
            accountNetwork,
            accountNetworkUpdateData,
        );

        return await this.accountNetworkRepository.save(accountUpdate);
    }

    async delete(adresse: AccountNetwork): Promise<boolean> {
        adresse.deletedAt = format(new Date(), 'yyyy-MM-dd');
        await this.accountNetworkRepository.save(adresse);

        return true;
    }
}

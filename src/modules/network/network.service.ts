import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { format } from 'date-fns';
import { MappedException } from 'nestjs-mapped-exception';
import { FindManyOptions, Like, Repository } from 'typeorm';
import { Network } from './network.entity';
import { NetworkException } from './network.exception';
import { GetAllNetworkType } from './types/GetAllNetwork.type';

@Injectable()
export class NetworkService {
    constructor(
        @InjectRepository(Network)
        private networkRepository: Repository<Network>,
        private readonly exception: MappedException<NetworkException>,
    ) {}

    async getNetworks(filters: GetAllNetworkType): Promise<Network[]> {
        const conditions: FindManyOptions<Network> = {
            take: filters.take,
            skip: filters.skip,
        };

        if (filters.search) {
            conditions.where = { name: Like('%' + filters.search + '%') };
        }

        return await this.networkRepository.find({
            ...conditions,
            withDeleted: false,
        });
    }

    public async getById(id: string): Promise<Network> {
        const network = await this.networkRepository.findOne({
            where: { id },
            withDeleted: false,
        });
        if (!network) {
            this.exception.ERRORS.NOT_FOUND.throw();
        }

        return network;
    }

    async exists(email: string): Promise<boolean> {
        const network = await this.networkRepository.findOne({
            where: { email },
            withDeleted: false,
        });

        return !!network;
    }

    async createAndSave(createNetworkInput: Network) {
        const network = this.networkRepository.create(createNetworkInput);

        return await this.networkRepository.save(network);
    }

    async update(
        network: Network,
        networkUpdateData: Network,
    ): Promise<Network> {
        const networkUpdate = this.networkRepository.merge(
            network,
            networkUpdateData,
        );

        return await this.networkRepository.save(networkUpdate);
    }

    async delete(network: Network): Promise<boolean> {
        network.deletedAt = format(new Date(), 'yyyy-MM-dd');
        await this.networkRepository.save(network);

        return true;
    }
}

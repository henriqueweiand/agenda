import {
    Args,
    Query,
    Resolver,
    Mutation,
    Parent,
    ResolveField,
} from '@nestjs/graphql';
import { BaseResolver } from '../common/resolver/base.resolver';
import { Network } from './network.entity';
import { NetworkService } from './network.service';
import { GetAllNetworkType } from './types/GetAllNetwork.type';
import { CreateNetworkInput } from './inputs/createNetwork.input';
import { UpdateNetworkInput } from './inputs/updateNetwork.input';
import { EstablishmentService } from '../establishment/establishment.service';

@Resolver(() => Network)
export class NetworkResolver extends BaseResolver {
    constructor(
        private networkService: NetworkService,
        private establishmentService: EstablishmentService,
    ) {
        super();
    }

    @Query(() => [Network])
    networks(@Args() filters: GetAllNetworkType) {
        return this.networkService.getNetworks(filters);
    }

    @Query(() => Network)
    network(@Args('id') id: string) {
        return this.networkService.getById(id);
    }

    @Mutation(() => Network)
    async createNetwork(
        @Args('createNetworkInput') createNetworkInput: CreateNetworkInput,
    ) {
        const network = await this.networkService.createAndSave(
            createNetworkInput as Network,
        );

        return network;
    }

    @Mutation(() => Network)
    async updateNetwork(
        @Args('id') id: string,
        @Args('updateNetworkInput') updateNetworkInput: UpdateNetworkInput,
    ) {
        const network = await this.networkService.getById(id);

        return await this.networkService.update(
            network,
            updateNetworkInput as Network,
        );
    }

    @Mutation(() => Network)
    async deleteNetwork(@Args('id') id: string) {
        const action = await this.networkService.getById(id);
        await this.networkService.delete(action);

        return action;
    }

    @ResolveField()
    async establishment(@Parent() network: Network) {
        return await this.establishmentService.getByNetwork(network.id);
    }
}

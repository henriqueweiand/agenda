import {
    Args,
    Query,
    Resolver,
    Mutation,
    ResolveField,
    Parent,
} from '@nestjs/graphql';
import { AccountNetworkService } from './accountNetwork.service';
import { AccountNetwork } from './accountNetwork.entity';
import { GetAllAccountNetworkType } from './types/GetAllAccountNetwork.type';
import { CreateAccountNetworkInput } from './inputs/createAccountNetwork.input';
import { UpdateAccountNetworkInput } from './inputs/updateAccountNetwork.input';
import { AccountService } from '../account/account.service';
import { NetworkService } from '../network/network.service';

@Resolver(() => AccountNetwork)
export class AccountNetworkResolver {
    constructor(
        private accountNetworkService: AccountNetworkService,
        private accountService: AccountService,
        private networkService: NetworkService,
    ) {}

    @Query(() => [AccountNetwork])
    accountNetwork(@Args() filters: GetAllAccountNetworkType) {
        return this.accountNetworkService.getAccountNetwork(filters);
    }

    @Query(() => AccountNetwork)
    adresse(@Args('id') id: string) {
        return this.accountNetworkService.getById(id);
    }

    @Mutation(() => AccountNetwork)
    async createAdresse(
        @Args('createadresseInput')
        createadresseInput: CreateAccountNetworkInput,
    ) {
        const accountNetwork = await this.accountNetworkService.createAndSave(
            createadresseInput as AccountNetwork,
        );

        return accountNetwork;
    }

    @Mutation(() => AccountNetwork)
    async updateAdresse(
        @Args('id') id: string,
        @Args('updateAccountNetworkInput')
        updateAccountNetworkInput: UpdateAccountNetworkInput,
    ) {
        const accountNetwork = await this.accountNetworkService.getById(id);

        return await this.accountNetworkService.update(
            accountNetwork,
            updateAccountNetworkInput as AccountNetwork,
        );
    }

    @Mutation(() => AccountNetwork)
    async deleteAccount(@Args('id') id: string) {
        const action = await this.accountNetworkService.getById(id);
        await this.accountNetworkService.delete(action);

        return action;
    }

    @ResolveField()
    async account(@Parent() accountNetwork: AccountNetwork) {
        return await this.accountService.getById(
            String(accountNetwork.account),
        );
    }

    @ResolveField()
    async network(@Parent() accountNetwork: AccountNetwork) {
        return await this.networkService.getById(
            String(accountNetwork.network),
        );
    }
}

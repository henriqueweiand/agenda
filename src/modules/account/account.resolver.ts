import {
    Args,
    Mutation,
    Query,
    Resolver,
    ResolveField,
    Parent,
} from '@nestjs/graphql';
import { BaseResolver } from '../common/resolver/base.resolver';
import { Account } from './account.entity';
import { AccountService } from './account.service';
import { GetAllAccountType } from './types/GetAllAccount.type';
import { CreateAccountInput } from './inputs/createAccount.input';
import { AdressesService } from '../adresses/adresses.service';
import { UpdateAccountInput } from './inputs/updateAccount.input';
import { AccountContactService } from '../accountContact/accountContact.service';
import { NetworkService } from '../network/network.service';

@Resolver(() => Account)
export class AccountResolver extends BaseResolver {
    constructor(
        private accountService: AccountService,
        private adressesService: AdressesService,
        private accountContactService: AccountContactService,
        private networkService: NetworkService,
    ) {
        super();
    }

    @Query(() => [Account])
    accounts(@Args() filters: GetAllAccountType) {
        return this.accountService.getAccounts(filters);
    }

    @Query(() => Account)
    account(@Args('id') id: string) {
        return this.accountService.getById(id);
    }

    @Mutation(() => Account)
    async createAccount(
        @Args('createAccountInput') createAccountInput: CreateAccountInput,
    ) {
        const account = await this.accountService.createAndSave(
            createAccountInput as Account,
        );

        return account;
    }

    @Mutation(() => Account)
    async updateAccount(
        @Args('id') id: string,
        @Args('updateAccountInput') updateAccountInput: UpdateAccountInput,
    ) {
        const account = await this.accountService.getById(id);

        return await this.accountService.update(
            account,
            updateAccountInput as Account,
        );
    }

    @Mutation(() => Account)
    async deleteAccount(@Args('id') id: string) {
        const action = await this.accountService.getById(id);
        await this.accountService.delete(action);

        return action;
    }

    @ResolveField()
    async adresses(@Parent() account: Account) {
        return await this.adressesService.getByAccount(account.id);
    }

    @ResolveField()
    async accountContact(@Parent() account: Account) {
        return await this.accountContactService.getByAccount(account.id);
    }

    @ResolveField()
    async network(@Parent() account: Account) {
        return await this.networkService.getById(String(account.network));
    }
}

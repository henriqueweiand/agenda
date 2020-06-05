import {
    Args,
    Mutation,
    Parent,
    Query,
    ResolveField,
    Resolver,
} from '@nestjs/graphql';
import { BaseResolver } from '../common/resolver/base.resolver';
import { Account } from './account.entity';
import { AccountService } from './account.service';
import { GetAllProductDto } from './dto/getAllAccountDto';
import { CreateAccountInput } from './inputs/createAccount.input';
import { AccountType } from './types/account.type';

@Resolver(() => AccountType)
export class AccountResolver extends BaseResolver {
    constructor(private accountService: AccountService) {
        super();
    }

    @Query(() => [AccountType])
    accounts(@Args() filters: GetAllProductDto) {
        return this.accountService.getAccounts(filters);
    }

    @Query(() => AccountType)
    account(@Args('id') id: string) {
        return this.accountService.getById(id);
    }

    @Mutation(() => AccountType)
    async createAccount(
        @Args('createAccountInput') createAccountInput: CreateAccountInput,
    ) {
        const account = await this.accountService.createAndSave(
            createAccountInput,
        );

        return account;
    }

    // @Mutation(() => AccountType)
    // async updateAccount(
    //     @Args('id') id: string,
    //     @Args('updateAccountInput') updateAccountInput: UpdateAccountInput,
    // ) {
    //     const { roles, ...accountData } = updateAccountInput;
    //     const account = await this.accountService.getAccount(id);
    //     await this.accountService.update(account, accountData);

    //     if (roles.length) {
    //         const assignIn = await this.rolesService.getMany(roles);
    //         this.accountService.assign(account, assignIn);
    //     }

    //     return account;
    // }

    @Mutation(() => AccountType)
    async deleteAccount(@Args('id') id: string) {
        const action = await this.accountService.getById(id);
        await this.accountService.delete(action);

        return action;
    }

    @ResolveField()
    async adresses(@Parent() account: Account) {
        // return await this.adressesService.getByAccount(account.id);
    }
}

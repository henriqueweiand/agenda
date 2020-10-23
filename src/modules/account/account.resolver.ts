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
import { AttachmentService } from '../attachment/attachment.service';
import { SchedulingService } from '../scheduling/scheduling.service';
import { AccountNetworkService } from '../accountNetwork/accountNetwork.service';
import { HandbookService } from '../handbook/handbook.service';

@Resolver(() => Account)
export class AccountResolver extends BaseResolver {
    constructor(
        private accountService: AccountService,
        private handbookService: HandbookService,
        private adressesService: AdressesService,
        private accountContactService: AccountContactService,
        private networkService: NetworkService,
        private attachmentService: AttachmentService,
        private schedulingService: SchedulingService,
        private accountNetworkService: AccountNetworkService,
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
    async handbook(@Parent() account: Account) {
        return await this.handbookService.getByAccount(account.id);
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

    @ResolveField()
    async attachment(@Parent() account: Account) {
        return await this.attachmentService.getByAccount(account.id);
    }

    @ResolveField()
    async patient(@Parent() account: Account) {
        return await this.schedulingService.getByPatient(
            String(account.patient),
        );
    }

    @ResolveField()
    async professional(@Parent() account: Account) {
        return await this.schedulingService.getByProfessional(
            String(account.professional),
        );
    }

    @ResolveField()
    async clerk(@Parent() account: Account) {
        return await this.schedulingService.getByClerk(String(account.clerk));
    }

    @ResolveField()
    async accountNetwork(@Parent() account: Account) {
        return await this.accountNetworkService.getByAccount(account.id);
    }
}

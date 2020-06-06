import {
    Args,
    Query,
    Resolver,
    Mutation,
    ResolveField,
    Parent,
} from '@nestjs/graphql';
import { AccountContactService } from './accountContact.service';
import { AccountContact } from './accountContact.entity';
import { GetAllAccountContactType } from './types/GetAllAccountContact.type';
import { CreateAccountContactInput } from './inputs/createAccountContact.input';
import { UpdateAccountContactInput } from './inputs/updateAccountContact.input';
import { AccountService } from '../account/account.service';

@Resolver(() => AccountContact)
export class AccountContactResolver {
    constructor(
        private accountContactService: AccountContactService,
        private accountService: AccountService,
    ) {}

    @Query(() => [AccountContact])
    accountsContacts(@Args() filters: GetAllAccountContactType) {
        return this.accountContactService.getAccountContact(filters);
    }

    @Query(() => AccountContact)
    accountContacts(@Args('id') id: string) {
        return this.accountContactService.getById(id);
    }

    @Mutation(() => AccountContact)
    async createAccountContact(
        @Args('createAccountContact')
        createAccountContact: CreateAccountContactInput,
    ) {
        const accountContact = await this.accountContactService.createAndSave(
            createAccountContact as AccountContact,
        );

        return accountContact;
    }

    @Mutation(() => AccountContact)
    async updateAccountContact(
        @Args('id') id: string,
        @Args('updateAccountContactInput')
        updateAccountContactInput: UpdateAccountContactInput,
    ) {
        const accountContact = await this.accountContactService.getById(id);

        return await this.accountContactService.update(
            accountContact,
            updateAccountContactInput as AccountContact,
        );
    }

    @Mutation(() => AccountContact)
    async deleteAccountContact(@Args('id') id: string) {
        const action = await this.accountContactService.getById(id);
        await this.accountContactService.delete(action);

        return action;
    }

    @ResolveField()
    async account(@Parent() accountContact: AccountContact) {
        return await this.accountService.getById(
            String(accountContact.account),
        );
    }
}

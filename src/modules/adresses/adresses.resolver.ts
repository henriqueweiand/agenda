import {
    Args,
    Query,
    Resolver,
    Mutation,
    ResolveField,
    Parent,
} from '@nestjs/graphql';
import { AdressesService } from './adresses.service';
import { Adresses } from './adresses.entity';
import { GetAllAdressesType } from './types/GetAllAdressesDto';
import { CreateAdressesInput } from './inputs/createAdresses.input';
import { UpdateAdressesInput } from './inputs/updateAdresses.input';
import { AccountService } from '../account/account.service';

@Resolver(() => Adresses)
export class AdressesResolver {
    constructor(
        private adressesService: AdressesService,
        private accountService: AccountService,
    ) {}

    @Query(() => [Adresses])
    adresses(@Args() filters: GetAllAdressesType) {
        return this.adressesService.getAdresses(filters);
    }

    @Query(() => Adresses)
    adresse(@Args('id') id: string) {
        return this.adressesService.getById(id);
    }

    @Mutation(() => Adresses)
    async createAdresse(
        @Args('createadresseInput') createadresseInput: CreateAdressesInput,
    ) {
        const adresses = await this.adressesService.createAndSave(
            createadresseInput as Adresses,
        );

        return adresses;
    }

    @Mutation(() => Adresses)
    async updateAdresse(
        @Args('id') id: string,
        @Args('updateAdressesInput') updateAdressesInput: UpdateAdressesInput,
    ) {
        const adresses = await this.adressesService.getById(id);

        return await this.adressesService.update(
            adresses,
            updateAdressesInput as Adresses,
        );
    }

    @Mutation(() => Adresses)
    async deleteAccount(@Args('id') id: string) {
        const action = await this.adressesService.getById(id);
        await this.adressesService.delete(action);

        return action;
    }

    @ResolveField()
    async account(@Parent() adresses: Adresses) {
        return await this.accountService.getById(String(adresses.account));
    }
}

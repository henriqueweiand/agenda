import { Args, Query, Resolver } from '@nestjs/graphql';
import { AdressesService } from './adresses.service';
import { Adresses } from './adresses.entity';

@Resolver(() => Adresses)
export class AdressesResolver {
    constructor(private adressesService: AdressesService) {}

    // @UseGuards(GraphQLAuthGuard)
    @Query(() => Adresses)
    adresse(@Args('id') id: string) {
        return this.adressesService.getById(id);
    }

    // @UseGuards(GraphQLAuthGuard)
    @Query(() => [Adresses])
    adresses() {
        return this.adressesService.getAdresses();
    }

    // @UseGuards(GraphQLAuthGuard)
    // @Mutation(() => Adresses)
    // async createRole(
    //     @Args('createAdressesInput')
    //     createAdressesInput: CreateAdressesInput,
    // ) {
    //     // return await this.adressesService.create(createAdressesInput);
    // }

    // @UseGuards(GraphQLAuthGuard)
    // @Mutation(() => Adresses)
    // async updateRole(
    //     @Args('id') id: string,
    //     @Args('createAdressesInput')
    //     createAdressesInput: Adresses,
    // ) {
    //     const role = await this.adressesService.getById(id);
    //     return await this.adressesService.update(role, createAdressesInput);
    // }

    // @UseGuards(GraphQLAuthGuard)
    // @Mutation(() => Adresses)
    // async deleteRole(@Args('id') id: string) {
    //     const role = await this.adressesService.getById(id);
    //     await this.adressesService.delete(role);

    //     return role;
    // }
}

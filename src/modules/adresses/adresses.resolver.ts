import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AdressesService } from './adresses.service';
import { CreateAdressesInput } from './inputs/createAdresses.input';
import { AdressesType } from './types/adresses.type';

@Resolver(() => AdressesType)
export class AdressesResolver {
    constructor(private adressesService: AdressesService) {}

    // @UseGuards(GraphQLAuthGuard)
    @Query(() => AdressesType)
    adresse(@Args('id') id: string) {
        return this.adressesService.getById(id);
    }

    // @UseGuards(GraphQLAuthGuard)
    @Query(() => [AdressesType])
    adresses() {
        return this.adressesService.getAdresses();
    }

    // @UseGuards(GraphQLAuthGuard)
    @Mutation(() => AdressesType)
    async createRole(
        @Args('createAdressesInput')
        createAdressesInput: CreateAdressesInput,
    ) {
        // return await this.adressesService.create(createAdressesInput);
    }

    // @UseGuards(GraphQLAuthGuard)
    // @Mutation(() => AdressesType)
    // async updateRole(
    //     @Args('id') id: string,
    //     @Args('createAdressesInput')
    //     createAdressesInput: Adresses,
    // ) {
    //     const role = await this.adressesService.getById(id);
    //     return await this.adressesService.update(role, createAdressesInput);
    // }

    // @UseGuards(GraphQLAuthGuard)
    @Mutation(() => AdressesType)
    async deleteRole(@Args('id') id: string) {
        const role = await this.adressesService.getById(id);
        await this.adressesService.delete(role);

        return role;
    }
}

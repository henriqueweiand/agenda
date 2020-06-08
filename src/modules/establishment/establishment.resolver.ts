import {
    Args,
    Mutation,
    Parent,
    Query,
    ResolveField,
    Resolver,
} from '@nestjs/graphql';
import { BaseResolver } from '../common/resolver/base.resolver';
import { NetworkService } from '../network/network.service';
import { SchedulingService } from '../scheduling/scheduling.service';
import { Establishment } from './establishment.entity';
import { EstablishmentService } from './establishment.service';
import { CreateEstablishmentInput } from './inputs/createEstablishment.input';
import { UpdateEstablishmentInput } from './inputs/updateEstablishment.input';
import { GetAllEstablishmentType } from './types/GetAllEstablishment.type';

@Resolver(() => Establishment)
export class EstablishmentResolver extends BaseResolver {
    constructor(
        private establishmentService: EstablishmentService,
        private networkService: NetworkService,
        private schedulingService: SchedulingService,
    ) {
        super();
    }

    @Query(() => [Establishment])
    establishments(@Args() filters: GetAllEstablishmentType) {
        return this.establishmentService.getEstablishments(filters);
    }

    @Query(() => Establishment)
    establishment(@Args('id') id: string) {
        return this.establishmentService.getById(id);
    }

    @Mutation(() => Establishment)
    async createEstablishment(
        @Args('createEstablishmentInput')
        createEstablishmentInput: CreateEstablishmentInput,
    ) {
        const establishment = await this.establishmentService.createAndSave(
            createEstablishmentInput as Establishment,
        );

        return establishment;
    }

    @Mutation(() => Establishment)
    async updateEstablishment(
        @Args('id') id: string,
        @Args('updateEstablishmentInput')
        updateEstablishmentInput: UpdateEstablishmentInput,
    ) {
        const establishment = await this.establishmentService.getById(id);

        return await this.establishmentService.update(
            establishment,
            updateEstablishmentInput as Establishment,
        );
    }

    @Mutation(() => Establishment)
    async deleteEstablishment(@Args('id') id: string) {
        const action = await this.establishmentService.getById(id);
        await this.establishmentService.delete(action);

        return action;
    }

    @ResolveField()
    async network(@Parent() establishment: Establishment) {
        return await this.networkService.getById(String(establishment.network));
    }

    @ResolveField()
    async scheduling(@Parent() establishment: Establishment) {
        return await this.schedulingService.getByHandEstablishment(
            establishment.id,
        );
    }
}

import {
    Args,
    Mutation,
    Parent,
    Query,
    ResolveField,
    Resolver,
} from '@nestjs/graphql';
import { AccountService } from '../account/account.service';
import { BaseResolver } from '../common/resolver/base.resolver';
import { EstablishmentService } from '../establishment/establishment.service';
import { HandbookService } from '../handbook/handbook.service';
import { CreateSchedulingInput } from './inputs/createScheduling.input';
import { UpdateSchedulingInput } from './inputs/updateScheduling.input';
import { Scheduling } from './scheduling.entity';
import { SchedulingService } from './scheduling.service';
import { GetAllSchedulingType } from './types/GetAllScheduling.type';

@Resolver(() => Scheduling)
export class SchedulingResolver extends BaseResolver {
    constructor(
        private schedulingService: SchedulingService,
        private establishmentService: EstablishmentService,
        private accountService: AccountService,
        private handbookService: HandbookService,
    ) {
        super();
    }

    @Query(() => [Scheduling])
    schedulings(@Args() filters: GetAllSchedulingType) {
        return this.schedulingService.getSchedulings(filters);
    }

    @Query(() => Scheduling)
    scheduling(@Args('id') id: string) {
        return this.schedulingService.getById(id);
    }

    @Mutation(() => Scheduling)
    async createScheduling(
        @Args('createSchedulingInput')
        createSchedulingInput: CreateSchedulingInput,
    ) {
        const scheduling = await this.schedulingService.createAndSave(
            createSchedulingInput as Scheduling,
        );

        return scheduling;
    }

    @Mutation(() => Scheduling)
    async updateScheduling(
        @Args('id') id: string,
        @Args('updateSchedulingInput')
        updateSchedulingInput: UpdateSchedulingInput,
    ) {
        const scheduling = await this.schedulingService.getById(id);

        return await this.schedulingService.update(
            scheduling,
            updateSchedulingInput as Scheduling,
        );
    }

    @Mutation(() => Scheduling)
    async deleteScheduling(@Args('id') id: string) {
        const action = await this.schedulingService.getById(id);
        await this.schedulingService.delete(action);

        return action;
    }

    @ResolveField()
    async establishment(@Parent() scheduling: Scheduling) {
        return await this.establishmentService.getById(
            String(scheduling.establishment),
        );
    }

    @ResolveField()
    async patient(@Parent() scheduling: Scheduling) {
        return await this.accountService.getById(String(scheduling.patient));
    }

    @ResolveField()
    async professional(@Parent() scheduling: Scheduling) {
        return await this.accountService.getById(
            String(scheduling.professional),
        );
    }

    @ResolveField()
    async clerk(@Parent() scheduling: Scheduling) {
        return await this.accountService.getById(String(scheduling.clerk));
    }

    @ResolveField()
    async handbook(@Parent() scheduling: Scheduling) {
        const handbook = String(scheduling.handbook);

        if (handbook !== 'null') {
            return await this.handbookService.getById(handbook);
        }
    }
}

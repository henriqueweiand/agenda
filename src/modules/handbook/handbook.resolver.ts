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
import { SchedulingService } from '../scheduling/scheduling.service';
import { Handbook } from './handbook.entity';
import { HandbookService } from './handbook.service';
import { CreateHandbookInput } from './inputs/createHandbook.input';
import { UpdateHandbookInput } from './inputs/updateHandbook.input';
import { GetAllHandbookType } from './types/GetAllHandbook.type';

@Resolver(() => Handbook)
export class HandbookResolver extends BaseResolver {
    constructor(
        private handbookService: HandbookService,
        private schedulingService: SchedulingService,
        private accountService: AccountService,
    ) {
        super();
    }

    @Query(() => [Handbook])
    handbooks(@Args() filters: GetAllHandbookType) {
        return this.handbookService.getHandbooks(filters);
    }

    @Query(() => Handbook)
    handbook(@Args('id') id: string) {
        return this.handbookService.getById(id);
    }

    @Mutation(() => Handbook)
    async createHandbook(
        @Args('createHandbookInput')
        createHandbookInput: CreateHandbookInput,
    ) {
        const handbook = await this.handbookService.createAndSave(
            createHandbookInput as Handbook,
        );

        return handbook;
    }

    @Mutation(() => Handbook)
    async updateHandbook(
        @Args('id') id: string,
        @Args('updateHandbookInput')
        updateHandbookInput: UpdateHandbookInput,
    ) {
        const handbook = await this.handbookService.getById(id);

        return await this.handbookService.update(
            handbook,
            updateHandbookInput as Handbook,
        );
    }

    @Mutation(() => Handbook)
    async deleteHandbook(@Args('id') id: string) {
        const action = await this.handbookService.getById(id);
        await this.handbookService.delete(action);

        return action;
    }

    @ResolveField()
    async scheduling(@Parent() handbook: Handbook) {
        return await this.schedulingService.getByHandbook(handbook.id);
    }

    @ResolveField()
    async account(@Parent() handbook: Handbook) {
        return await this.accountService.getById(String(handbook.account));
    }
}

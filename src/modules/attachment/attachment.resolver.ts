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
import { Attachment } from './attachment.entity';
import { AttachmentService } from './attachment.service';
import { CreateAttachmentInput } from './inputs/createAttachment.input';
import { UpdateAttachmentInput } from './inputs/updateAttachment.input';
import { GetAllAttachmentType } from './types/GetAllAttachment.type';

@Resolver(() => Attachment)
export class AttachmentResolver extends BaseResolver {
    constructor(
        private attachmentService: AttachmentService,
        private accountService: AccountService,
    ) {
        super();
    }

    @Query(() => [Attachment])
    attachments(@Args() filters: GetAllAttachmentType) {
        return this.attachmentService.getAttachments(filters);
    }

    @Query(() => Attachment)
    attachment(@Args('id') id: string) {
        return this.attachmentService.getById(id);
    }

    @Mutation(() => Attachment)
    async createAttachment(
        @Args('createAttachmentInput')
        createAttachmentInput: CreateAttachmentInput,
    ) {
        const attachment = await this.attachmentService.createAndSave(
            createAttachmentInput as Attachment,
        );

        return attachment;
    }

    @Mutation(() => Attachment)
    async updateAttachment(
        @Args('id') id: string,
        @Args('updateAttachmentInput')
        updateAttachmentInput: UpdateAttachmentInput,
    ) {
        const attachment = await this.attachmentService.getById(id);

        return await this.attachmentService.update(
            attachment,
            updateAttachmentInput as Attachment,
        );
    }

    @Mutation(() => Attachment)
    async deleteAttachment(@Args('id') id: string) {
        const action = await this.attachmentService.getById(id);
        await this.attachmentService.delete(action);

        return action;
    }

    @ResolveField()
    async account(@Parent() attachment: Attachment) {
        return await this.accountService.getById(String(attachment.account));
    }
}

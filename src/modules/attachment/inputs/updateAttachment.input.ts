import { InputType } from '@nestjs/graphql';
import { AttachmentInput } from './attachment.input';

@InputType()
export class UpdateAttachmentInput extends AttachmentInput {}

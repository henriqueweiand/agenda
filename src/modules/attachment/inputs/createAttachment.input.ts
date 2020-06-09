import { InputType } from '@nestjs/graphql';
import { AttachmentInput } from './attachment.input';

@InputType()
export class CreateAttachmentInput extends AttachmentInput {}

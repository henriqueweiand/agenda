import { InputType } from '@nestjs/graphql';
import { SchedulingInput } from './scheduling.input';

@InputType()
export class UpdateSchedulingInput extends SchedulingInput {}

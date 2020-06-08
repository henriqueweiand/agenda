import { InputType } from '@nestjs/graphql';
import { SchedulingInput } from './scheduling.input';

@InputType()
export class CreateSchedulingInput extends SchedulingInput {}

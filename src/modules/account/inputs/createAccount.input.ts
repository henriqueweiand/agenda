import { InputType } from '@nestjs/graphql';
import { Account } from '../account.entity';

@InputType()
export class CreateAccountInput extends Account {}

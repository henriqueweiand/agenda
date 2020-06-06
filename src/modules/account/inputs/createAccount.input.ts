import { InputType } from '@nestjs/graphql';
import { AccountInput } from './account.input';

@InputType()
export class CreateAccountInput extends AccountInput {}

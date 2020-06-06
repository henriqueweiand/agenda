import { InputType } from '@nestjs/graphql';
import { AccountContactInput } from './accountContact.input';

@InputType()
export class CreateAccountContactInput extends AccountContactInput {}

import { InputType, OmitType } from '@nestjs/graphql';
import { AccountContactInput } from './accountContact.input';
import { Exclude } from 'class-transformer';

@InputType()
export class UpdateAccountContactInput extends OmitType(AccountContactInput, [
    'account',
]) {
    @Exclude()
    account: any;
}

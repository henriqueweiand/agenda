import { InputType } from '@nestjs/graphql';
import { AccountInput } from './account.input';
import { Exclude } from 'class-transformer';

@InputType()
export class UpdateAccountInput extends AccountInput {
    @Exclude()
    adresses: any;
}

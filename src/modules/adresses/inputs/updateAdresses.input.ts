import { InputType, OmitType } from '@nestjs/graphql';
import { AdressesInput } from './adresses.input';
import { Exclude } from 'class-transformer';

@InputType()
export class UpdateAdressesInput extends OmitType(AdressesInput, ['account']) {
    @Exclude()
    account: any;
}

import { InputType, OmitType } from '@nestjs/graphql';
import { AccountNetworkInput } from './accountNetwork.input';
import { Exclude } from 'class-transformer';

@InputType()
export class UpdateAccountNetworkInput extends OmitType(AccountNetworkInput, [
    'account',
]) {
    @Exclude()
    account: any;
}

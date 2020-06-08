import { InputType } from '@nestjs/graphql';
import { NetworkInput } from './network.input';
import { Exclude } from 'class-transformer';

@InputType()
export class UpdateNetworkInput extends NetworkInput {
    @Exclude()
    account: any;

    @Exclude()
    establishment: any;
}

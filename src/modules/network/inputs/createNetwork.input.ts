import { InputType } from '@nestjs/graphql';
import { NetworkInput } from './network.input';

@InputType()
export class CreateNetworkInput extends NetworkInput {}

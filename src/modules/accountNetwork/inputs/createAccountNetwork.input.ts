import { InputType } from '@nestjs/graphql';
import { AccountNetworkInput } from './accountNetwork.input';

@InputType()
export class CreateAccountNetworkInput extends AccountNetworkInput {}

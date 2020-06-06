import { InputType } from '@nestjs/graphql';
import { AdressesInput } from './adresses.input';

@InputType()
export class CreateAdressesInput extends AdressesInput {}

import { InputType } from '@nestjs/graphql';
import { EstablishmentInput } from './establishment.input';

@InputType()
export class CreateEstablishmentInput extends EstablishmentInput {}

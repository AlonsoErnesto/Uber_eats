import { Field, ObjectType } from '@nestjs/graphql'
import { CoreOutput } from 'src/modules/common/dtos/output.dto'

@ObjectType()
export class LoginOutput extends CoreOutput {
  @Field(() => String, { nullable: true })
  token?: string
}

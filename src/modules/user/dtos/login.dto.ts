import { Field, ObjectType } from "@nestjs/graphql";
import { MutationOutput } from "src/modules/common/dtos/output.dto";


@ObjectType()
export class LoginOutput extends MutationOutput {

   @Field(type => String,{nullable:true})
   token?: string;

}
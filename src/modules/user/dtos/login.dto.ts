import { Field, ObjectType } from "@nestjs/graphql";
import { CoreOutput } from "src/modules/common/dtos/output.dto";


@ObjectType()
export class LoginOutput extends CoreOutput {

   @Field(type => String,{nullable:true})
   token?: string;

}
import { Field, InputType, ObjectType, PickType } from "@nestjs/graphql";
import { User } from "src/modules/user/entities/user.entity";

@InputType()
export class LoginInput extends PickType(User,["email","password"]) {}

@ObjectType()
export class MutationOutput {
   @Field( type => String ,{nullable:true})
   error?:string
   
   @Field(type => Boolean)
   ok : boolean;
}
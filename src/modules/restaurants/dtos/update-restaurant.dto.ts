import { ArgsType, Field, InputType, OmitType, PartialType } from "@nestjs/graphql";
import { createRestaurantDto } from "./create-restaurant.dto";

@InputType()
export class updateRestaurantInputType extends PartialType(createRestaurantDto){}

@ArgsType()
export class updateRestaurantDto {
   @Field( type => Number )
   id : number;

   @Field(type=>updateRestaurantInputType)
   data : updateRestaurantInputType;
}
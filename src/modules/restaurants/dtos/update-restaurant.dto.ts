import { Field, InputType, PartialType } from '@nestjs/graphql'
import { createRestaurantDto } from './create-restaurant.dto'

@InputType()
class UpdateRestaurantInputType extends PartialType(createRestaurantDto) {}

@InputType()
export class UpdateRestaurantDto {
  @Field(() => Number)
  id: number

  @Field(() => UpdateRestaurantInputType)
  data: UpdateRestaurantInputType
}

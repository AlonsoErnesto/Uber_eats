import { Resolver , Query, Args, Mutation } from "@nestjs/graphql";
import { createRestaurantDto } from "./dtos/create-restaurant.dto";
import { Restaurant } from "./entities/restaurant.entity";

@Resolver(of => Restaurant)
export class RestaurantResolver {

   //  Querys
   @Query( returns => [Restaurant])
   restaurants(@Args('vegan')veganOnly:boolean) : Restaurant[] {
      return [];
   };

   // Mutations
   @Mutation (returns => Boolean)
   createRestaurant(
      @Args() createRestaurantDto:createRestaurantDto,
   ):boolean {
      console.log(createRestaurantDto);
      return true;
   }

}
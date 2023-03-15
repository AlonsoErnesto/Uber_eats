import { Resolver , Query, Args, Mutation } from "@nestjs/graphql";
import { createRestaurantDto } from "./dtos/create-restaurant.dto";
import { Restaurant } from "./entities/restaurant.entity";
import { RestaurantService } from "./restaurants.service";

@Resolver(of => Restaurant)
export class RestaurantResolver {

   constructor(private readonly restaurantService : RestaurantService){}

   //  Querys
   @Query( returns => [Restaurant])
   restaurants(): Promise<Restaurant[]> {
      return this.restaurantService.getAll();
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
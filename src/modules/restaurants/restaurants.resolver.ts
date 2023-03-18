import { Resolver , Query, Args, Mutation } from "@nestjs/graphql";
import { createRestaurantDto } from "./dtos/create-restaurant.dto";
import { updateRestaurantDto, updateRestaurantInputType } from "./dtos/update-restaurant.dto";
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
   async createRestaurant(@Args('input') createRestaurantDto:createRestaurantDto):Promise<boolean> {
      try {
         await this.restaurantService.createRestaurant(createRestaurantDto);
         return true;
      } catch(err){
         console.log(err);
         return false;
      }
   };

   @Mutation(returns => Boolean)
   async updateRestaurant(@Args('input')updateRestaurantDto:updateRestaurantDto){
      return true;
   }
}
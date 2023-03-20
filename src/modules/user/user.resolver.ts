import { Resolver,Query, Mutation, Args } from "@nestjs/graphql";
import { LoginInput } from "../common/dtos/output.dto";
import { CreateAccountInput, CreateAccountOutput } from "./dtos/create-account.dto";
import { LoginOutput } from "./dtos/login.dto";
import { User } from "./entities/user.entity";
import { UsersService } from "./user.service";


@Resolver(of => User)
export class UsersResolver {
   constructor(private readonly usersService:UsersService){}

   @Query(returns => Boolean)
   hi ()  {
      return true;
   }


   @Mutation(returns => CreateAccountOutput)
   async createAccount(@Args("input")createAccountInput:CreateAccountInput) :Promise<CreateAccountOutput>{
      try {
         return this.usersService.createAccount(createAccountInput);
      } catch(error) { 
         return {
            error,
            ok :false,
         }
      }
   };


   @Mutation (returns => LoginOutput)
   async login (@Args('input')loginInput:LoginInput):Promise<LoginOutput> {
      try {
         return await this.usersService.login(loginInput);
      } catch(error){
         return {
            ok : false,
            error,
         }
      }
   }

}
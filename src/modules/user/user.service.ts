import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { LoginInput } from "../common/dtos/output.dto";
import { CreateAccountInput } from "./dtos/create-account.dto";
import { User } from "./entities/user.entity";
import { JwtService } from "../jwt/jwt.service";
import { EditProfileInput } from "./dtos/edit-profile.dto";

@Injectable()
export class UsersService {
   constructor(@InjectRepository(User) private readonly users:Repository<User>,
   private readonly jwtService:JwtService)
   
   {}

   async createAccount({email, password, role} :CreateAccountInput) : Promise<{ok:boolean,error?:string}> {
      try {
         const exists = await this.users.findOne({where:{email}})
         if(exists) {
            return {ok:false,error:'Este correo ya esta en uso.'};
         };
         await this.users.save(this.users.create({email,password,role}))
         return {ok:true};
      } catch(e){
         return {ok:false,error:'Ocurrio un problema al crear la cuenta, vuelva a intentarlo.'};
      };
   };

   async login({email, password}: LoginInput):Promise<{ok:boolean,error?:string,token?:string}> {
      try {
         const user = await this.users.findOne({where:{email}});
         if(!user){
            return {
               ok:false,
               error:'Correo no registrado.'
            }
         }
         const passwordCorrect = await user.checkPassword(password);
         if(!passwordCorrect){
            return {
               ok : false,
               error : "Contraseña incorrecta."
            };
         };
         const token = this.jwtService.sign(user.id);
         return { 
            ok:true,
            token,
         }
      } catch(error){
         return {
            ok:false,
            error,
         }
      }
   }
   async findById(id:number):Promise<User>{
      return this.users.findOne({where:{id}});
   }

   async editProfile(userId:number,{email,password}:EditProfileInput){
      return this.users.update(userId,{email,password});
   }
}
import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { isBoolean, IsString, Length } from "class-validator";

@InputType({isAbstract:true})
@ObjectType()
@Entity()
export class Restaurant {

   @PrimaryGeneratedColumn()
   @Field( type => Number)
   id : number;

   @Field(type => String)
   @Column()
   @IsString()
   @Length(5)
   name : string;

   @Field(type => Boolean, { nullable : true})
   @Column()
   isVegan? : boolean;

   @Field(type => String )
   @Column()
   address : String;

   @Field(type => String )
   @Column()
   ownerName : string;

   @Field(type => String)
   @Column()
   categoryName : string
}
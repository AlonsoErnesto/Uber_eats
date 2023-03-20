import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import {  ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

// Modules imports
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { UserModule } from './modules/user/user.module';
import { User } from './modules/user/entities/user.entity';
import { CommonModule } from './modules/common/common.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal : true,
      envFilePath : process.env.NODE_ENV === "dev" ? ".env.dev" : ".env.test",
      ignoreEnvFile : process.env.NODE_ENV === "prod",
      validationSchema : Joi.object({
        NODE_ENV : Joi.string().valid('dev','prod').required(),
        DB_HOST : Joi.string().required(),
        DB_PORT : Joi.string().required(),
        DB_USERNAME : Joi.string().required(),
        DB_PASSWORD : Joi.string().required(),
        DB_NAME : Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRoot({
      type : 'postgres',
      host : process.env.DB_HOST,
      port : +process.env.DB_PORT,
      username : process.env.DB_USERNAME,
      password : process.env.DB_PASSWORD,
      database : process.env.DB_NAME,
      synchronize : process.env.NODE_ENV !== 'prod',
      logging : process.env.NODE_ENV !== 'prod',
      entities : [User]
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver:ApolloDriver,
      autoSchemaFile : true,
    }),
    // Modules
    UserModule,
    CommonModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

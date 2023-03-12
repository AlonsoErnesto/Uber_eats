import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import {  ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

// Modules imports
import { RestaurantsModule } from './modules/restaurants/restaurants.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver:ApolloDriver,
      autoSchemaFile : true,
    }),
    // Modules
    RestaurantsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

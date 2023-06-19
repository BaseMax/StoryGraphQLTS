import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { MongooseModule } from "@nestjs/mongoose";
import { GraphQLError, GraphQLFormattedError } from "graphql";
import { AuthModule } from "./components/auth/auth.module";
import { StoryModule } from "./components/story/story.module";

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URL),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      typePaths: ["./components/**/*.graphql"],
      sortSchema: true,
      context: ({ req }) => ({ req }),
      formatError: (error: GraphQLError) => {
        const graphQLFormattedError: GraphQLFormattedError = {
          errors: error.extensions.originalError,
        } as any;
        return graphQLFormattedError;
      },
    }),
    AuthModule,
    StoryModule,
  ],
})
export class AppModule {}

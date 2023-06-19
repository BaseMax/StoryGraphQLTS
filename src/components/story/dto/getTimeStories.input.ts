import { Field, InputType } from "@nestjs/graphql";
import { IsString } from "class-validator";

@InputType()
export class GetTimedStoriesInput {
  @Field({ name: "id of the story" })
  @IsString()
  id: string;

  @Field({ name: "creatorUserId of the story" })
  @IsString()
  creatorUserId: string;

  @Field({ name: "type of the story" })
  @IsString()
  type: string;

  @Field({ name: "storyName of the story" })
  @IsString()
  storyName: string;

  @Field({ name: "createdAt time of the story" })
  @IsString()
  createdAt: string;

  @Field({ name: "updatedAt time of the story" })
  @IsString()
  updatedAt: string;
}

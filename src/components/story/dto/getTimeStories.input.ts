import { Field, InputType } from "@nestjs/graphql";
import { IsString } from "class-validator";

@InputType()
export class GetTimedStoriesInput {
  @Field({ name: "id of the story" })
  @IsString({ message: "please send id" })
  id: string;

  @Field({ name: "creatorUserId of the story" })
  @IsString({ message: "please send creatorUserId" })
  creatorUserId: string;

  @Field({ name: "type of the story" })
  @IsString({ message: "please send type" })
  type: string;

  @Field({ name: "storyName of the story" })
  @IsString({ message: "please send storyName" })
  storyName: string;

  @Field({ name: "createdAt time of the story" })
  @IsString({ message: "please send createdAt" })
  createdAt: string;

  @Field({ name: "updatedAt time of the story" })
  @IsString({ message: "please send updatedAt" })
  updatedAt: string;
}

import { CreateStoryInput } from "./create-story.input";
import { PartialType } from "@nestjs/mapped-types";
import { Field, InputType } from "@nestjs/graphql";
import { IsString } from "class-validator";

@InputType()
export class UpdateStoryInput extends PartialType(CreateStoryInput) {
  @Field()
  @IsString({ message: "please send storyId" })
  storyId: string;
}

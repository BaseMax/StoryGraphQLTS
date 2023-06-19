import { Field, InputType } from "@nestjs/graphql";
import { IsBoolean, IsDateString, IsString } from "class-validator";

@InputType()
export class CreateStoryInput {
  @Field()
  @IsString()
  attachedFile: string;
  @Field()
  @IsString()
  backgroundColor: string;
  @Field()
  @IsString()
  backgroundImage: string;
  @Field()
  @IsString()
  type: string;
  @Field()
  @IsDateString()
  toTime: string;
  @Field()
  @IsDateString()
  toDate: string;
  @Field()
  @IsString()
  storyName: string;
  @Field()
  @IsBoolean()
  isShareable: string;
  @Field()
  @IsDateString()
  fromTime: string;
  @Field()
  @IsDateString()
  fromDate: string;
  @Field()
  @IsString()
  externalWebLink: string;
}

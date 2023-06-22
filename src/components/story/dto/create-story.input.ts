import { Field, InputType } from "@nestjs/graphql";
import { IsBoolean, IsDateString, IsString } from "class-validator";

@InputType()
export class CreateStoryInput {
  @Field()
  @IsString({ message: "please send attachedFile" })
  attachedFile: string;

  @Field()
  @IsString({ message: "please send backgroundColor" })
  backgroundColor: string;

  @Field()
  @IsString({ message: "please send backgroundImage" })
  backgroundImage: string;

  @Field()
  @IsString({ message: "please send type" })
  type: string;

  @Field()
  @IsDateString()
  toTime: string;

  @Field()
  @IsDateString()
  toDate: string;

  @Field()
  @IsString({ message: "please send storyName" })
  storyName: string;

  @Field()
  @IsBoolean({ message: "please send isShareable" })
  isShareable: string;

  @Field()
  @IsDateString()
  fromTime: string;

  @Field()
  @IsDateString()
  fromDate: string;

  @Field()
  @IsString({ message: "please send externalWebLink" })
  externalWebLink: string;

  creatorUserId: string;
}

import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class GetTimedStoriesInput {
  @Field({ name: "id of the story" })
  id: string;
  @Field({ name: "creatorUserId of the story" })
  creatorUserId: string;
  @Field({ name: "type of the story" })
  type: string;
  @Field({ name: "storyName of the story" })
  storyName: string;
  @Field({ name: "createdAt time of the story" })
  createdAt: string;
  @Field({ name: "updatedAt time of the story" })
  updatedAt: string;
}

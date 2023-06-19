import { CreateStoryInput } from "./create-story.input";
import { PartialType } from "@nestjs/mapped-types";

export class UpdateStoryInput extends PartialType(CreateStoryInput) {
  storyId: string;
}

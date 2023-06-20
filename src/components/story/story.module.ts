import { Module } from "@nestjs/common";
import { StoryService } from "./story.service";
import { StoryResolver } from "./story.resolver";
import { MongooseModule } from "@nestjs/mongoose";
import { Story, storySchema } from "../../models/story.model";
import { ScanStory, scanStorySchema } from "../../models/scanStory.model";
import StoryRepo from "./story.repo";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Story.name,
        schema: storySchema,
      },
      {
        name: ScanStory.name,
        schema: scanStorySchema,
      },
    ]),
  ],
  providers: [StoryResolver, StoryService, StoryRepo],
})
export class StoryModule {}

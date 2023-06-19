import { Resolver, Mutation, Args, Query } from "@nestjs/graphql";
import { StoryService } from "./story.service";
import { CreateStoryInput } from "./dto/create-story.input";
import { UpdateStoryInput } from "./dto/update-story.input";
import { GuestUserAccess, UserAccess } from "src/guards/accessStory.user.guard";
import { UseGuards } from "@nestjs/common";
import User from "src/decorator/user.decorator";
import { GetTimedStoriesInput } from "./dto/getTimeStories.input";

@Resolver("Story")
export class StoryResolver {
  constructor(private readonly storyService: StoryService) {}

  @UseGuards(UserAccess)
  @Mutation("createStory")
  async createStory(
    @Args("createStoryInput") createStoryInput: CreateStoryInput,
  ) {
    return await this.storyService.createStory(createStoryInput);
  }

  @UseGuards(UserAccess)
  @Mutation("updateStory")
  async updateStory(
    @Args("updateStoryInput") updateStoryInput: UpdateStoryInput,
  ) {
    const { storyId } = updateStoryInput;
    delete updateStoryInput.storyId;
    return await this.storyService.updateStory(storyId, updateStoryInput);
  }

  @UseGuards(UserAccess)
  @Mutation("removeStory")
  async removeStory(@Args("id") id: string) {
    return await this.storyService.removeStory(id);
  }

  @UseGuards(GuestUserAccess)
  @Mutation("scanStory")
  async scanStory(@Args("id") storyId: string, @User() user: { id: string }) {
    return await this.storyService.scanStory(user.id, storyId);
  }

  @UseGuards(UserAccess)
  @Query("getStory")
  async getStory(@Args("storyId") storyId: string) {
    return await this.storyService.getStory(storyId);
  }

  @Query("getTimedStories")
  async getTimedStories(
    @Args("GetTimedStoriesInput") sts: GetTimedStoriesInput,
    @Args("limit") limit: number,
    @Args("page") page: number,
    @User() user: { id: string; isGuest?: boolean },
  ) {
    if (!user.isGuest)
      return await this.storyService.getTimedStories(sts, page, limit);

    return await this.storyService.getGuestTimedStories(sts, page, limit);
  }

  @Query("getStories")
  async getStories(
    @Args("limit") limit: number,
    @Args("page") page: number,
    @User() user: { id: string; isGuest?: boolean },
  ) {
    if (!user.isGuest) return await this.storyService.getStories(page, limit);

    return await this.storyService.getGuestScanedStories(user.id, page, limit);
  }
}

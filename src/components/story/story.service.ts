import { Injectable } from "@nestjs/common";
import { CreateStoryInput } from "./dto/create-story.input";
import { GetTimedStoriesInput } from "./dto/getTimeStories.input";
import { UpdateStoryInput } from "./dto/update-story.input";
import StoryRepo from "./story.repo";

@Injectable()
export class StoryService {
  constructor(private readonly storyRepo: StoryRepo) {}

  public async createStory(createStoryInput: CreateStoryInput) {
    const story = await this.storyRepo.createStory(createStoryInput);
    return story;
  }

  public async updateStory(id: string, updateStoryInput: UpdateStoryInput) {
    const story = await this.storyRepo.editStory(id, updateStoryInput);
    return story;
  }

  public async removeStory(id: string) {
    const story = await this.storyRepo.removeStory(id);
    return story;
  }

  public async scanStory(userId: string, storyId: string) {
    const story = await this.scanStory(userId, storyId);
    return story;
  }

  public async getStory(storyId: string) {
    const story = await this.getStory(storyId);
    return story;
  }

  public async getTimedStories(
    sts: GetTimedStoriesInput,
    page: number,
    limit: number,
  ) {
    const story = await this.storyRepo.findOneWithQuery(sts, page, limit);
    return story;
  }

  public async getGuestTimedStories(
    sts: GetTimedStoriesInput,
    page: number,
    limit: number,
  ) {
    const story = await this.storyRepo.getGuestTimedStory(sts, page, limit);
    return story;
  }

  public async getGuestScanedStories(
    userId: string,
    page: number,
    limit: number,
  ) {
    const stories = await this.storyRepo.getGuestScanedStories(
      userId,
      page,
      limit,
    );
    return stories;
  }

  public async getStories(page: number, limit: number) {
    return await this.storyRepo.find(page, limit);
  }
}

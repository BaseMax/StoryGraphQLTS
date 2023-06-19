import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ScanStory } from "../../models/scanStory.model";
import { Story } from "../../models/story.model";
import { CreateStoryInput } from "./dto/create-story.input";
import { GetTimedStoriesInput } from "./dto/getTimeStories.input";
import { UpdateStoryInput } from "./dto/update-story.input";

@Injectable()
class StoryRepo {
  constructor(
    @InjectModel(Story.name) private readonly storyModel: Model<Story>,
    @InjectModel(ScanStory.name)
    private readonly scanStoryModel: Model<ScanStory>,
  ) {}

  public async createStory(s: CreateStoryInput) {
    const story = await this.storyModel.create(s);
    return {
      creatorUserId: story.creatorUserId,
      type: story.type,
      fromDate: story.fromDate,
      fromTime: story.fromTime,
      toDate: story.toDate,
      toTime: story.toTime,
      storyName: story.storyName,
      backgroundColor: story.backgroundColor,
      backgroundImage: story.backgroundImage,
      isShareable: story.isShareable,
      attachedFile: story.attachedFile,
      externalWebLink: story.externalWebLink,
      _id: story._id,
    };
  }

  public async editStory(storyId: string, s: UpdateStoryInput) {
    const story = await this.storyModel.findOneAndUpdate(
      { _id: storyId },
      {
        $set: s,
      },
      {
        returnOriginal: false,
      },
    );

    return {
      creatorUserId: story.creatorUserId,
      type: story.type,
      fromDate: story.fromDate,
      fromTime: story.fromTime,
      toDate: story.toDate,
      toTime: story.toTime,
      storyName: story.storyName,
      backgroundColor: story.backgroundColor,
      backgroundImage: story.backgroundImage,
      isShareable: story.isShareable,
      attachedFile: story.attachedFile,
      externalWebLink: story.externalWebLink,
      _id: story._id,
    };
  }

  public async removeStory(id: string) {
    await this.storyModel.deleteOne({ _id: id });
    return {
      id,
    };
  }

  public async findOneWithId(id: string) {
    const story = await this.storyModel.findOne(
      { _id: id },
      {},
      {
        projection: {
          __v: false,
        },
      },
    );
    return story;
  }

  public async find(page: number, limit: number) {
    const stories = await this.storyModel
      .find(
        {},
        {},
        {
          projection: {
            __v: false,
          },
        },
      )
      .limit(limit)
      .skip((page - 1) * limit);

    return stories;
  }

  public async scanStory(userId: string, storyId: string) {
    const scanstory = await this.scanStoryModel.create({ storyId, userId });
    return {
      userId,
      storyId,
      _id: scanstory._id,
    };
  }

  public async findOneWithQuery(
    sts: GetTimedStoriesInput,
    limit?: number,
    page?: number,
  ) {
    page = page ? page : 1;
    limit = limit ? limit : 10;
    const story = await this.storyModel
      .findOne({
        _id: sts.id,
        creatorUserId: sts.creatorUserId,
        type: sts.type,
        storyName: sts.storyName,
        createdAt: sts.createdAt,
        updatedAt: sts.updatedAt,
      })
      .limit(limit)
      .skip((page - 1) * limit);
    return story;
  }

  public async getGuestTimedStory(
    sts: GetTimedStoriesInput,
    limit?: number,
    page?: number,
  ) {
    page = page ? page : 1;
    limit = limit ? limit : 10;
    const pipeline = [
      {
        $lookup: {
          from: "stories",
          localField: "storyId",
          foreignField: "_id",
          as: "stories",
        },
      },
      {
        $match: {
          _id: sts.id,
          userId: sts.creatorUserId,
          "stories.type": sts.type,
          "stories.storyName": sts.storyName,
          "stories.createdAt": sts.createdAt,
          "stories.updatedAt": sts.updatedAt,
        },
      },
      {
        $limit: limit,
      },
      {
        $skip: (page - 1) * limit,
      },
    ];

    const story = await this.scanStoryModel.aggregate(pipeline);
    return story;
  }

  public async getGuestScanedStories(
    userId: string,
    page: number,
    limit: number,
  ) {
    return await this.scanStoryModel
      .find(
        { userId },
        {},
        {
          populate: { path: "storyId" },
        },
      )
      .skip((page - 1) * limit)
      .limit(limit);
  }
}

export default StoryRepo;

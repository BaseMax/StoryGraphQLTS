import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model, ObjectId } from "mongoose";
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

  private generateObjectId(i: any) {
    return new mongoose.Types.ObjectId(i);
  }

  public async createStory(s: CreateStoryInput) {
    s["creatorUserId"] = this.generateObjectId(s.creatorUserId);

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

    if (!story) return {};

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
    const { deletedCount } = await this.storyModel.deleteOne({ _id: id });
    return {
      id,
      deleted: deletedCount >= 1 ? true : false,
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

  public async find(userId: string, page: number, limit: number) {
    const stories = await this.storyModel
      .find(
        {
          creatorUserId: this.generateObjectId(userId),
        },
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
    const scanstory = await this.scanStoryModel.create({
      storyId: this.generateObjectId(storyId),
      userId: this.generateObjectId(userId),
    });
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
        _id: this.generateObjectId(sts.id),
        creatorUserId: this.generateObjectId(sts.creatorUserId),
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
        $limit: limit,
      },
      {
        $skip: (page - 1) * limit,
      },
      {
        $unwind: "$stories",
      },
      { $replaceRoot: { newRoot: "$stories" } },
      {
        $match: {
          _id: this.generateObjectId(sts.id),
          creatorUserId: this.generateObjectId(sts.creatorUserId),
          type: sts.type,
          storyName: sts.storyName,
          createdAt: sts.createdAt,
          updatedAt: sts.updatedAt,
        },
      },
    ];

    const story = await this.scanStoryModel.aggregate(pipeline);
    console.log(story);

    return story;
  }

  public async getGuestScanedStories(
    userId: string,
    page: number,
    limit: number,
  ) {
    const pipeline = [
      {
        $lookup: {
          from: "stories",
          localField: "storyId",
          foreignField: "_id",
          as: "scanstories",
        },
      },
      {
        $match: {
          userId: this.generateObjectId(userId),
        },
      },
      {
        $limit: limit,
      },
      {
        $skip: (page - 1) * limit,
      },
      {
        $project: {
          scanstories: 1,
          _id: 0,
        },
      },
      {
        $unwind: "$scanstories",
      },
      { $replaceRoot: { newRoot: "$scanstories" } },
    ];
    return await this.scanStoryModel.aggregate(pipeline);
  }
}

export default StoryRepo;

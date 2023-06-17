import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

type StoryDocument = HydratedDocument<Story>;

@Schema({
  validateBeforeSave: false,
})
class Story {
  @Prop({
    type: String,
    required: true,
    index: true,
  })
  creatorId: string;

  @Prop({
    type: String,
    required: true,
    index: true,
  })
  type: string;

  @Prop({
    type: Date,
    required: true,
  })
  fromDate: Date;

  @Prop({
    type: Date,
    required: true,
  })
  fromTime: Date;

  @Prop({
    type: Date,
    required: true,
  })
  toDate: Date;

  @Prop({
    type: Date,
    required: true,
  })
  toTime: Date;

  @Prop({
    type: String,
    required: true,
    index: true,
  })
  storyName: string;

  @Prop({
    type: String,
    required: true,
  })
  backgroundColor: string;

  @Prop({
    type: String,
    required: true,
  })
  backgroundImage: string;

  @Prop({
    type: String,
    required: true,
  })
  externalWebLink: string;

  @Prop({
    type: String,
    required: true,
  })
  attachedFile: string;

  @Prop({
    type: Boolean,
    required: true,
  })
  isShareable: boolean;
}

const storyModel = SchemaFactory.createForClass(Story);

export { storyModel, StoryDocument, Story };

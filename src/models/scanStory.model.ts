import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

type ScanStoryDocument = HydratedDocument<ScanStory>;

@Schema({
  validateBeforeSave: false,
  timestamps: {
    createdAt: true,
  },
})
class ScanStory {
  @Prop({
    type: Types.ObjectId,
    required: true,
    index: true,
  })
  userId: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    required: true,
    index: true,
  })
  storyId: Types.ObjectId;
}

const scanStorySchema = SchemaFactory.createForClass(ScanStory);

export { scanStorySchema, ScanStoryDocument, ScanStory };

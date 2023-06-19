import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "./../src/app.module";
import { connect, Model, model, Schema } from "mongoose";

describe("AppController (e2e)", () => {
  // db models
  let userModel: Model<any>;
  let guestUserModel: Model<any>;
  let storyModel: Model<any>;
  let scanstoryModel: Model<any>;

  // app
  let app: INestApplication;

  const defaultUsers: any[] = [{}];

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    await connect("mongodb://localhost:27017/maxstory");

    userModel = model("users", new Schema({}, { strict: false }));
    await userModel.deleteMany({});

    guestUserModel = model("guestusers", new Schema({}, { strict: false }));
    await guestUserModel.deleteMany({});

    storyModel = model("stories", new Schema({}, { strict: false }));
    await storyModel.deleteMany({});

    scanstoryModel = model("scanstories", new Schema({}, { strict: false }));
    await scanstoryModel.deleteMany({}).then(console.log);
  });

  test("plus plus", () => {
    expect(2 + 2).toBe(4);
  });
});

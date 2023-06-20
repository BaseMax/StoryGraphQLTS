import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "./../src/app.module";
import mongoose, { connect, Model, model, Schema, Types } from "mongoose";
import { hashSync } from "bcrypt";

describe("AppController (e2e)", () => {
  // db models
  let userModel: Model<any>;
  let guestUserModel: Model<any>;
  let storyModel: Model<any>;
  let scanstoryModel: Model<any>;

  // default
  const defaultUser = {
    email: "default@gmail.com",
    password: hashSync("default", 8),
    name: "default",
  };

  const defaultLoginUser = {
    email: "default@gmail.com",
    password: "default",
  };

  const rootUserInfo = {
    email: "rootUser@gmail.com",
    password: hashSync("rootUs", 8),
    name: "root",
  };

  const rootUserlogin = {
    email: "rootUser@gmail.com",
    password: "rootUs",
  };

  let rootUser;

  // app
  let app: INestApplication;

  // storyId
  const storyId = [];

  const timedStory = [];

  const seedStoryDB = async (userId: string) => {
    for (let i = 0; i < 20; i++) {
      const ss = await storyModel.create({
        attachedFile: "ss",
        backgroundColor: "dkndkvdkvn",
        backgroundImage: "dkndkvdkvn",
        type: "test",
        toTime: "2023-06-19T16:13:45.687Z",
        toDate: "2023-06-19T16:13:45.687Z",
        storyName: "ttt",
        isShareable: true,
        fromTime: "2023-06-19T16:13:45.687Z",
        fromDate: "2023-06-19T16:13:45.687Z",
        externalWebLink: "dkndkvdkvn",
        creatorUserId: new mongoose.Types.ObjectId(userId),
      });
      storyId.push(ss._id);
      timedStory.push(ss);
    }
  };

  beforeAll(async () => {
    await connect("mongodb://0.0.0.0:27017/maxstory");
    userModel = model(
      "users",
      new Schema(
        { createdAt: { type: Date }, updatedAt: { type: Date } },
        { timestamps: { createdAt: true }, strict: false },
      ),
    );
    guestUserModel = model(
      "guestusers",
      new Schema(
        { createdAt: { type: Date }, updatedAt: { type: Date } },
        { timestamps: { createdAt: true }, strict: false },
      ),
    );
    storyModel = model(
      "stories",
      new Schema(
        { createdAt: { type: Date }, updatedAt: { type: Date } },
        { timestamps: { createdAt: true }, strict: false },
      ),
    );
    scanstoryModel = model(
      "scanstories",
      new Schema(
        { createdAt: { type: Date }, updatedAt: { type: Date } },
        { timestamps: { createdAt: true }, strict: false },
      ),
    );
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({}));

    await app.init();
    // await userModel.deleteMany();

    const defaultUserExists = await userModel.findOne({
      email: defaultLoginUser.email,
    });

    if (!defaultUserExists) {
      const du = await userModel.create(defaultUser);
    }

    const rootUserExists = await userModel.findOne({
      email: rootUserInfo.email,
    });

    if (!rootUserExists) {
      const ru = await userModel.create(rootUserInfo);
      rootUser = ru._id;
    }

    await guestUserModel.create({});

    // create stories for test;
    await seedStoryDB(rootUser);
  });

  const tokens = {
    user: "",
    guestUser: "",
    rootUser: "",
  };

  describe("login", () => {
    const login = (email: string, password: string) => {
      const mutation = `
      mutation Login($input: loginInput!) {
        login(loginInput: $input) {
         message
         accessToken
        }
      }
    `;
      const variables = { input: { email, password } };
      return request(app.getHttpServer())
        .post("/graphql")
        .send({ query: mutation, variables });
    };

    it("shoult not return successfull message and accessToken ", async () => {
      const { status, body } = await login("failurelogin@gmail.com", "failure");
      expect(status).toBe(200);
      expect(body.data.login).toHaveProperty("accessToken");
      expect(body.data.login.accessToken).toBe(null);
    });

    it("should give validation error", async () => {
      const { status, body } = await login("djvbdvdkv", "dvkddddddddddddddd");
      expect(status).toBe(200);
      expect(body).toHaveProperty("errors");
      expect(body.errors.data).toBe(undefined);
    });

    it("should login successfuly", async () => {
      const { status, body } = await login(
        defaultLoginUser.email,
        defaultLoginUser.password,
      );

      tokens.user = body.data.login.accessToken;

      expect(status).toBe(200);
      expect(body.data.login).toHaveProperty("accessToken");
      expect(typeof body.data.login.accessToken).toBe("string");
    });

    it("should login successfuly for root user", async () => {
      const { status, body } = await login(
        rootUserlogin.email,
        rootUserlogin.password,
      );
      tokens.rootUser = body.data.login.accessToken;
      expect(status).toBe(200);
      expect(body.data.login).toHaveProperty("accessToken");
      expect(typeof body.data.login.accessToken).toBe("string");
    });
  });

  describe("register", () => {
    const register = (email: string, name: string, password: string) => {
      const mutation = `
        mutation Register($input: registerInput!) {
          register(registerInput: $input) {
            id 
            name 
            email 
            created
            message
          }
        }
      `;
      const variables = { input: { email, password, name } };
      return request(app.getHttpServer())
        .post("/graphql")
        .send({ query: mutation, variables });
    };

    it("should register successfuly", async () => {
      await userModel.deleteOne({ email: "thisistest@gmil.com" });

      const { email, name, password } = {
        email: "thisistest@gmil.com",
        password: "testme",
        name: "test",
      };
      const { status, body } = await register(email, name, password);
      expect(status).toBe(200);
      expect(body.data.register.created).toBeTruthy();
      expect(body.data.register).toHaveProperty("id");
    });

    it("should give validation error", async () => {
      const { email, name, password } = {
        email: "thisistest",
        password: "testmessssssssssssssss",
        name: "testssssssss",
      };
      const { status, body } = await register(email, name, password);
      expect(status).toBe(200);
      expect(body).toHaveProperty("errors");
      expect(body.errors.data).toBe(undefined);
    });

    it("should not register because user exists", async () => {
      const { status, body } = await register(
        defaultUser.email,
        defaultUser.name,
        "default",
      );
      expect(status).toBe(200);
      expect(body.data.register.created).toBeFalsy();
      expect(body.data.register.id).toBe(null);
    });
  });

  describe("validate guest token", () => {
    let token: string;

    const validateGuestToken = (token: string) => {
      const mutation = `
      mutation isvalidGuestToken($input: String!) {
        isvalidGuestToken(token: $input) {
          isvalid
        }
      }
    `;
      const variables = {
        input: token,
      };

      return request(app.getHttpServer())
        .post("/graphql")
        .send({ query: mutation, variables });
    };

    const getGuestToken = () => {
      const query = `
      query {
        getGuestToken {
          accessToken
        }
      }
      `;

      return request(app.getHttpServer()).post("/graphql").send({ query });
    };

    it("should return token", async () => {
      const { status, body } = await getGuestToken();

      token = body.data.getGuestToken.accessToken;
      tokens.guestUser = body.data.getGuestToken.accessToken;
      expect(status).toBe(200);
      expect(typeof body.data.getGuestToken.accessToken).toBe("string");
    });

    it("should return valid token status", async () => {
      const { status, body } = await validateGuestToken(token);
      expect(status).toBe(200);
      expect(body.data.isvalidGuestToken.isvalid).toBeTruthy();
    });

    it("should return invalid token status", async () => {
      const { status, body } = await validateGuestToken("kdjvndv");
      expect(status).toBe(200);
      expect(body.data.isvalidGuestToken.isvalid).toBeFalsy();
    });
  });

  describe("story", () => {
    it("should create story", async () => {
      const mutation = `
      mutation story {
        createStory(createStoryInput: {
          attachedFile: "ss"
          backgroundColor: "dkndkvdkvn"
          backgroundImage: "dkndkvdkvn"
          type: "test"
          toTime: "2023-06-19T16:13:45.687Z"
          toDate: "2023-06-19T16:13:45.687Z"
          storyName: "ttt"
          isShareable: true
          fromTime: "2023-06-19T16:13:45.687Z"
          fromDate: "2023-06-19T16:13:45.687Z"
          externalWebLink: "dkndkvdkvn"
        }) {
          attachedFile
          backgroundColor
          backgroundImage
          creatorUserId
          type
          toTime
          toDate
          storyName
          isShareable
          fromTime
          fromDate
          externalWebLink
          creatorUserId
          _id
        }
      }
      `;

      const { status, body } = await request(app.getHttpServer())
        .post("/graphql")
        .set("Authorization", `accessToken=${tokens.user}`)
        .send({ query: mutation });
      expect(status).toBe(200);
      expect(body.data.createStory).toHaveProperty("_id");
    });

    it("should update story", async () => {
      const s = await storyModel.create({});
      const mutation = `
      mutation story {
        updateStory(updateStoryInput: {
          storyId: "${s._id}"
          attachedFile: "ss"
          backgroundColor: "dkndkvdkvn"
          backgroundImage: "dkndkvdkvn"
          type: "test"
          toTime: "2023-06-19T16:13:45.687Z"
          toDate: "2023-06-19T16:13:45.687Z"
          storyName: "ttt"
          isShareable: false
          fromTime: "2023-06-19T16:13:45.687Z"
          fromDate: "2023-06-19T16:13:45.687Z"
          externalWebLink: "dkndkvdkvn"
        }) {
          attachedFile
          backgroundColor
          backgroundImage
          creatorUserId
          type
          toTime
          toDate
          storyName
          isShareable
          fromTime
          fromDate
          externalWebLink
          creatorUserId
          _id
        }
      }
      `;
      const { status, body } = await request(app.getHttpServer())
        .post("/graphql")
        .set("Authorization", `accessToken=${tokens.user}`)
        .send({ query: mutation });
      expect(status).toBe(200);
      expect(body.data.updateStory).toHaveProperty("_id");
    });

    it("should delete story", async () => {
      const s = await storyModel.create({});

      const mutation = `
      mutation story {
        removeStory(id: "${s._id}"){
          id
          deleted
        }
      }
      `;
      const { status, body } = await request(app.getHttpServer())
        .post("/graphql")
        .set("Authorization", `accessToken=${tokens.user}`)
        .send({ query: mutation });
      expect(status).toBe(200);
      expect(body.data.removeStory).toHaveProperty("id");
      expect(body.data.removeStory.deleted).toBeTruthy();
    });

    it("should scan story", async () => {
      const story = await storyModel.insertMany([{}, {}]);

      const mutation = `
      mutation scan($input: String!) {
        scanStory(storyId: $input) {
          _id
          storyId
          userId
        }
      }
      `;

      const input = {
        input: story[0]._id,
      };

      const { status, body } = await request(app.getHttpServer())
        .post("/graphql")
        .set("Authorization", `accessToken=${tokens.guestUser}`)
        .send({ query: mutation, variables: input });

      expect(status).toBe(200);
      expect(body.data.scanStory).toHaveProperty("userId");
      expect(body.data.scanStory).toHaveProperty("_id");
      expect(body.data.scanStory).toHaveProperty("storyId");
    });

    it("should return one story", async () => {
      const query = `
      query story($input: String!){
      getStory(storyId: $input) {
        _id
        backgroundColor
      }
    }
      `;
      const input = {
        input: storyId.pop(),
      };

      const { status, body } = await request(app.getHttpServer())
        .post("/graphql")
        .set("Authorization", `accessToken=${tokens.user}`)
        .send({
          query,
          variables: input,
        });

      expect(status).toBe(200);
      expect(body.data.getStory).toHaveProperty("_id");
      expect(body.data.getStory).toHaveProperty("backgroundColor");
    });

    it("should return stories from user", async () => {
      const query = `
      query getStories($page: Int!, $limit: Int!){
        getStories(page: $page, limit: $limit) {
        _id
        backgroundColor
      }
    }
      `;
      const input = {
        page: 1,
        limit: 3,
      };

      const { status, body } = await request(app.getHttpServer())
        .post("/graphql")
        .set("Authorization", `accessToken=${tokens.rootUser}`)
        .send({
          query,
          variables: input,
        });
      expect(Array.isArray(body.data.getStories)).toBeTruthy();
      expect([body.data.getStories].flat().length).toBe(3);
      expect(body.data.getStories[0]).toHaveProperty("_id");
      expect(body.data.getStories[0]).toHaveProperty("backgroundColor");
      expect(status).toBe(200);
    });

    it("should return stories from guest", async () => {
      const query = `
      query getStories($page: Int!, $limit: Int!){
        getStories(page: $page, limit: $limit) {
        _id
      }
    }
      `;
      const input = {
        page: 1,
        limit: 1,
      };

      const { status, body } = await request(app.getHttpServer())
        .post("/graphql")
        .set("Authorization", `accessToken=${tokens.guestUser}`)
        .send({
          query,
          variables: input,
        });
      expect(Array.isArray(body.data.getStories)).toBeTruthy();
      expect([body.data.getStories].flat().length).toBe(1);
      expect(body.data.getStories[0]).toHaveProperty("_id");
      expect(status).toBe(200);
    });

    it("should return timed stories from user", async () => {
      const story = timedStory.pop();
      const query = `
      query story {
        getTimedStories(sts:{
              creatorUserId: "${rootUser}"
              id: "${story._id}"
              type: "${story.type}"
              storyName: "${story.storyName}"
              createdAt: "${story.createdAt}",
              updatedAt: "${story.updatedAt}",
        }limit: 1, page: 1) {
          _id
          attachedFile
        }
      }
      `;

      const { status, body } = await request(app.getHttpServer())
        .post("/graphql")
        .set("Authorization", `accessToken=${tokens.user}`)
        .send({
          query,
        });
      expect(body.data.getTimedStories);
      expect(body.data.getTimedStories);
      expect(status).toBe(200);
    });
    it("should return timed stories from guest", async () => {
      const query = `
      query story {
        getTimedStories(sts:{
              creatorUserId: "6491a39937b89d8b5993540a"
              id:"6491a39937b89d8b59935435"
              type: "test"
              storyName: "ttt"
           createdAt: "2023-06-20T13:03:21.847Z",
          updatedAt: "2023-06-20T13:03:21.847Z",
      
      
        }limit: 1, page: 1) {
          _id
          attachedFile
        }
      }
      `;

      const { status, body } = await request(app.getHttpServer())
        .post("/graphql")
        .set("Authorization", `accessToken=${tokens.guestUser}`)
        .send({
          query,
        });
      expect(body.data.getTimedStories).toHaveProperty("_id");
      expect(body.data.getTimedStories).toHaveProperty("attachedFile");
      expect(status).toBe(200);
    });
  });
});

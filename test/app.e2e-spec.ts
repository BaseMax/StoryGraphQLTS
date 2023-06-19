import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "./../src/app.module";
import { connect, isValidObjectId, Model, model, Schema } from "mongoose";
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

  // app
  let app: INestApplication;

  beforeAll(async () => {
    await connect("mongodb://0.0.0.0:27017/maxstory");
    userModel = model("users", new Schema({}, { strict: false }));
    guestUserModel = model("guestusers", new Schema({}, { strict: false }));
    storyModel = model("stories", new Schema({}, { strict: false }));
    scanstoryModel = model("scanstories", new Schema({}, { strict: false }));
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({}));

    await app.init();

    await userModel.deleteMany({});
    await userModel.create(defaultUser);

    await guestUserModel.deleteMany({});

    await storyModel.deleteMany({});

    await scanstoryModel.deleteMany({});
  });

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

    it("shout login successfuly", async () => {
      const { status, body } = await login(
        defaultLoginUser.email,
        defaultLoginUser.password,
      );
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

      expect(status).toBe(200);
      expect(typeof body.data.getGuestToken.accessToken).toBe("string");
    });

    it("should return valid token status", async () => {
      const { status, body } = await validateGuestToken(token);
      console.log(body);

      expect(status).toBe(200);
      expect(body.data.isvalidGuestToken.isvalid).toBeTruthy();
    });

    it("should return invalid token status", async () => {
      const { status, body } = await validateGuestToken("kdjvndv");
      expect(status).toBe(200);
      expect(body.data.isvalidGuestToken.isvalid).toBeFalsy();
    });
  });
});

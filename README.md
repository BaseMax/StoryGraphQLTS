# Story GraphQL TS

This project is a GraphQL-based API powered by NestJS and implemented in TypeScript. It provides various features for user authentication, user management, and story-related operations. The API supports both user and guest user roles, each with specific permissions and functionality.

## Main Features

- **Login:** Allows users to authenticate and obtain a user token.
- **Register:** Enables user registration.
- **Get Guest Token:** Returns a UUID token for guest users.
- **Auth and Check Guest Token:** Verifies the validity of a guest token.
- **Get Stories:** Retrieves a list of stories based on the user's role:
  - For users: Returns a list of all stories created by the user.
  - For guest users: Returns a list of all stories scanned by the guest user.
- **Get Timed Stories:** Retrieves a list of timed stories based on the user's role:
  - For users: Returns a list of all timed stories created by the user.
  - For guest users: Returns a list of all timed stories scanned by the guest user.
- **Get Subscribed Stories:** Retrieves a list of subscribed stories based on the user's role:
  - For users: Returns a list of all subscribed stories created by the user.
  - For guest users: Returns a list of all subscribed stories scanned by the guest user.
- **Delete Account:** Deactivates a user account and keeps a record of the deletion:
  - This route is available to both user roles.
- **Get Story:** Retrieves the details of a specific story based on the user's role:
  - This route is available to both user roles.
- **Scan Story:** Scans a story for a guest user:
  - This route is only available to guest users.
- **Create New Story:** Creates a new story:
  - This route is only available to users.
- **Edit Story:** Edits an existing story:
  - This route is only available to users.
- **Delete My Story:** Deletes a story created by the user:
  - This route is only available to users.

## GraphQL Operations

### Queries

#### Login

Allows users to authenticate and obtain a user token.

**Input:**
- email (string)
- password (string)

**Output:**
- token (string)

#### GetGuestToken

Returns a UUID token for guest users.

**Output:**
- token (string)

#### AuthAndCheckGuestToken

Verifies the validity of a guest token.

**Input:**
- token (string)

**Output:**
- isValid (boolean)

#### GetStories

Retrieves a list of stories based on the user's role.

**Output:**
- stories (array of Story objects)

#### GetTimedStories

Retrieves a list of timed stories based on the user's role.

**Output:**
- timedStories (array of Story objects)

#### GetSubscribedStories

Retrieves a list of subscribed stories based on the user's role.

**Output:**
- subscribedStories (array of Story objects)

#### GetStory

Retrieves the details of a specific story based on the user's role.

**Input:**
- storyId (string)

**Output:**
- story (Story object)

### Mutations

#### Register

Enables user registration.

**Input:**
- name (string)
- email (string)
- password (string)

**Output:**
- user (User object)

#### DeleteAccount

Deactivates a user account and keeps a record of the deletion.

**Output:**
- success (boolean)

#### ScanStory

Scans a story for a guest user.

**Input:**
- storyId (string)
- token (string)

**Output:**
- success (boolean)

#### CreateStory

Creates a new story.

**Input:**
- creatorUserId (string)
- type (string, values: "timed", "subscribed")
- fromDate (datetime, nullable, applicable only for timed stories)
- fromTime (datetime, nullable, applicable only for timed stories)
- toDate (datetime, nullable, applicable only for timed stories)
- toTime (datetime, nullable, applicable only for timed stories)
- storyName (string, required)
- backgroundColor (string, hex or rgb)
- backgroundImage (string, link to an image)
- isShareable (boolean, default: true)
- attachedFile (string, nullable)
- externalWebLink (string, nullable)

**Output:**
- story (Story object)

#### EditStory

Edits an existing story.

**Input:**
- storyId (string)
- creatorUserId (string)
- type (string, values: "timed", "subscribed")
- fromDate (datetime, nullable, applicable only for timed stories)
- fromTime (datetime, nullable, applicable only for timed stories)
- toDate (datetime, nullable, applicable only for timed stories)
- toTime (datetime, nullable, applicable only for timed stories)
- storyName (string, required)
- backgroundColor (string, hex or rgb)
- backgroundImage (string, link to an image)
- isShareable (boolean, default: true)
- attachedFile (string, nullable)
- externalWebLink (string, nullable)

**Output:**
- story (Story object)

#### DeleteMyStory

Deletes a story created by the user.

**Input:**
- storyId (string)

**Output:**
- success (boolean)

### Types

#### User

- id (string)
- name (string)
- email (string)
- password (string)

#### GuestUser

- id (string)
- token (string)
- versionNumber (int)
- operationSystem (string)
- userAgent (string)
- displayDetails (string)
- createdAt (datetime)

#### Story

- id (string)
- creatorUserId (string)
- type (string, values: "timed", "subscribed")
- fromDate (datetime, nullable, applicable only for timed stories)
- fromTime (datetime, nullable, applicable only for timed stories)
- toDate (datetime, nullable, applicable only for timed stories)
- toTime (datetime, nullable, applicable only for timed stories)
- storyName (string, required)
- backgroundColor (string, hex or rgb)
- backgroundImage (string, link to an image)
- isShareable (boolean, default: true)
- attachedFile (string, nullable)
- externalWebLink (string, nullable)
- createdAt (datetime)
- updatedAt (datetime, nullable)

#### UserScanned

- id (string)
- userId (string)
- storyId (string)
- datetime (datetime)

#### DeleteUserAccount

- id (string)
- userId (string)
- datetime (datetime)

#### DeleteGuestAccount

- id (string)
- userId (string)
- datetime (datetime)

Please note that the above GraphQL operations and types provide a high-level overview of the API functionality. The actual implementation may require additional fields, arguments, or validation logic based on your specific project requirements.

### Query: Login

Allows users to authenticate and obtain a user token.

**Input:**

```graphql
query {
  login(email: "example@example.com", password: "password123") {
    token
  }
}
```

**Output:**

```json
{
  "data": {
    "login": {
      "token": "<user_token>"
    }
  }
}
```

### Query: GetGuestToken

Returns a UUID token for guest users.

**Input:**

```graphql
query {
  getGuestToken {
    token
  }
}
```

**Output:**

```json
{
  "data": {
    "getGuestToken": {
      "token": "<guest_token>"
    }
  }
}
```

### Query: AuthAndCheckGuestToken

Verifies the validity of a guest token.

**Input:**

```graphql
query {
  authAndCheckGuestToken(token: "<guest_token>") {
    isValid
  }
}
```

**Output:**

```json
{
  "data": {
    "authAndCheckGuestToken": {
      "isValid": true
    }
  }
}
```

### Query: GetStories

Retrieves a list of stories based on the user's role.

**Input:**

```graphql
query {
  getStories {
    id
    creatorUserId
    type
    storyName
    createdAt
    updatedAt
  }
}
```

**Output:**

```json
{
  "data": {
    "getStories": [
      {
        "id": "<story_id_1>",
        "creatorUserId": "<user_id>",
        "type": "subscribed",
        "storyName": "Story 1",
        "createdAt": "<created_at_1>",
        "updatedAt": "<updated_at_1>"
      },
      {
        "id": "<story_id_2>",
        "creatorUserId": "<user_id>",
        "type": "timed",
        "storyName": "Story 2",
        "createdAt": "<created_at_2>",
        "updatedAt": "<updated_at_2>"
      },
      ...
    ]
  }
}
```

### Query: GetTimedStories

Retrieves a list of timed stories based on the user's role.

**Input:**

```graphql
query {
  getTimedStories {
    id
    creatorUserId
    type
    storyName
    createdAt
    updatedAt
  }
}
```

**Output:**

```json
{
  "data": {
    "getTimedStories": [
      {
        "id": "<timed_story_id_1>",
        "creatorUserId": "<user_id>",
        "type": "timed",
        "storyName": "Timed Story 1",
        "createdAt": "<timed_created_at_1>",
        "updatedAt": "<timed_updated_at_1>"
      },
      {
        "id": "<timed_story_id_2>",
        "creatorUserId": "<user_id>",
        "type": "timed",
        "storyName": "Timed Story 2",
        "createdAt": "<timed_created_at_2>",
        "updatedAt": "<timed_updated_at_2>"
      },
      ...
    ]
  }
}
```

### Query: GetSubscribedStories

Retrieves a list of subscribed stories based on the user's role.

**Input:**

```graphql
query {
  getSubscribedStories {
    id
    creatorUserId
    type
    storyName
    createdAt
    updatedAt
  }
}
```

**Output:
**
```json
{
  "data": {
    "getSubscribedStories": [
      {
        "id": "<subscribed_story_id_1>",
        "creatorUserId": "<user_id>",
        "type": "subscribed",
        "storyName": "Subscribed Story 1",
        "createdAt": "<subscribed_created_at_1>",
        "updatedAt": "<subscribed_updated_at_1>"
      },
      {
        "id": "<subscribed_story_id_2>",
        "creatorUserId": "<user_id>",
        "type": "subscribed",
        "storyName": "Subscribed Story 2",
        "createdAt": "<subscribed_created_at_2>",
        "updatedAt": "<subscribed_updated_at_2>"
      },
      ...
    ]
  }
}
```

### Query: GetStory

Retrieves the details of a specific story.

**Input:**

```graphql
query {
  getStory(storyId: "<story_id>") {
    id
    creatorUserId
    creator {
      id
      name
    }
    type
    storyName
    backgroundColor
    backgroundImage
    isShareable
    attachedFile
    externalWebLink
    createdAt
    updatedAt
  }
}
```

**Output:**

```json
{
  "data": {
    "getStory": {
      "id": "<story_id>",
      "creatorUserId": "<user_id>",
      "type": "subscribed",
      "storyName": "Story 1",
      "backgroundColor": "#ffffff",
      "backgroundImage": "https://example.com/image.jpg",
      "isShareable": true,
      "attachedFile": "https://example.com/file.pdf",
      "externalWebLink": "https://example.com",
      "createdAt": "<created_at>",
      "updatedAt": "<updated_at>"
    }
  }
}
```

### Mutation: CreateStory

Creates a new story.

**Input:**

```graphql
mutation {
  createStory(input: {
    type: "timed",
    fromDate: "2023-06-15T00:00:00Z",
    fromTime: "09:00:00",
    toDate: "2023-06-16T00:00:00Z",
    toTime: "18:00:00",
    storyName: "New Story",
    backgroundColor: "#ff0000",
    backgroundImage: "https://example.com/image.jpg",
    isShareable: true,
    attachedFile: "https://example.com/file.pdf",
    externalWebLink: "https://example.com"
  }) {
    id
    creatorUserId
    type
    storyName
    createdAt
    updatedAt
  }
}
```

**Output:**

```json
{
  "data": {
    "createStory": {
      "id": "<new_story_id>",
      "creatorUserId": "<user_id>",
      "type": "timed",
      "storyName": "New Story",
      "createdAt": "<created_at>",
      "updatedAt": "<updated_at>"
    }
  }
}
```

### Mutation: EditStory

Edits an existing story.

**Input:**

```graphql
mutation {
  editStory(input: {
    storyId: "<story_id>",
    type: "subscribed",
    storyName: "Updated Story",
    backgroundColor: "#00ff00",
    backgroundImage: "https://example.com/new_image.jpg",
    isShareable: false,
    attachedFile: "https://example.com/new_file.pdf",
    externalWebLink: "https://example.com/new_link"
  }) {
    id
    creatorUserId
    type
    storyName
    createdAt
    updatedAt
  }
}
```

**Output:**

```json
{
  "data": {
    "editStory": {
      "id": "<story_id>",
      "creatorUserId": "<user_id>",
      "type": "subscribed",
      "storyName": "Updated Story",
      "createdAt": "<created_at>",
      "updatedAt": "<updated_at>"
    }
  }
}
```

### Mutation: DeleteStory

Deletes a specific story.

**Input:**

```graphql
mutation {
  deleteStory(storyId: "<story_id>", userId: "<user_id>") {
    id
    creatorUserId
    storyName
  }
}
```

**Output:**

```json
{
  "data": {
    "deleteStory": {
      "id": "<story_id>",
      "creatorUserId": "<user_id>",
      "storyName": "Deleted Story"
    }
  }
}
```

Please note that the `<user_id>`, `<guest_token>`, `<story_id>`, and other placeholders should be replaced with actual values specific to your application.

These are just a few examples of how you can write tests for your GraphQL-based project powered by NestJS and TypeScript. Depending on your specific requirements, you can write additional tests to cover different scenarios and ensure the quality and reliability of your codebase.

Remember to run your tests regularly as part of your development process to catch any issues early and maintain a stable and bug-free GraphQL API.

## Testing

Testing is an essential part of ensuring the functionality and reliability of your GraphQL API. NestJS provides a robust testing framework that allows you to write unit tests, integration tests, and end-to-end tests for your GraphQL resolvers and modules.

### Unit Testing

Unit tests focus on testing individual components, such as resolvers and services, in isolation. These tests verify that each component behaves as expected and handles different scenarios correctly.

To write unit tests for your GraphQL resolvers, you can use tools like Jest, which is a popular testing framework supported by NestJS.

Example unit test for a resolver:

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { MyResolver } from './my.resolver';
import { MyService } from './my.service';

describe('MyResolver', () => {
  let resolver: MyResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MyResolver, MyService],
    }).compile();

    resolver = module.get<MyResolver>(MyResolver);
  });

  it('should return a greeting message', () => {
    const result = resolver.getGreeting();
    expect(result).toEqual('Hello, World!');
  });
});
```

### Integration Testing

Integration tests focus on testing the interactions between different components of your application, such as resolvers, services, and the database. These tests ensure that the components work together correctly and handle real-world scenarios.

To write integration tests for your GraphQL API, you can use tools like Supertest to send HTTP requests to your API endpoints and assert the responses.

Example integration test for a GraphQL mutation:

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/graphql (POST)', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `mutation {
          createUser(name: "John Doe", email: "johndoe@example.com", password: "password123") {
            id
            name
            email
          }
        }`,
      })
      .expect(200)
      .expect((res) => {
        const { body } = res;
        expect(body.data.createUser).toHaveProperty('id');
        expect(body.data.createUser).toHaveProperty('name', 'John Doe');
        expect(body.data.createUser).toHaveProperty('email', 'johndoe@example.com');
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
```

### End-to-End Testing

End-to-end (E2E) tests simulate the complete workflow of your application, including sending requests to your GraphQL API and verifying the actual results against expected outcomes. These tests ensure that your API functions correctly from the client's perspective.

To write end-to-end tests for your GraphQL API, you can use tools like Jest and a GraphQL client library, such as Apollo Client, to send requests and assert the responses.

Example end-to-end test for a GraphQL query:

```typescript
import { ApolloServer } from 'apollo-server-express';
import { createTestClient } from 'apollo-server-integration-testing';
import { gql } from 'apollo-server-core';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';

describe('App (e2e)', () => {
  let apolloServer: ApolloServer;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    apolloServer = moduleFixture.get<ApolloServer>(ApolloServer);
  });

  it('should return a list of users', async () => {
    const { query } = createTestClient({
      apolloServer,
    });

    const GET_USERS_QUERY = gql`
      query {
        users {
          id
          name
          email
        }
      }
    `;

    const { data } = await query({ query: GET_USERS_QUERY });

    expect(data.users).toHaveLength(2);
    expect(data.users[0]).toHaveProperty('id');
    expect(data.users[0]).toHaveProperty('name');
    expect(data.users[0]).toHaveProperty('email');
  });
});
```

These are just a few examples of how you can write tests for your GraphQL-based project powered by NestJS and TypeScript. Depending on your specific requirements, you can write additional tests to cover different scenarios and ensure the quality and reliability of your codebase.

Remember to run your tests regularly as part of your development process to catch any issues early and maintain a stable and bug-free GraphQL API.

Copyright 2023, Max Base

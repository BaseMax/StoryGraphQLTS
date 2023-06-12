# Story GraphQL TS

# Project Name

## Description

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

Copyright 2023, Max Base

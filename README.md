# Story GraphQL TS

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

## Models

### User

- id
- name
- email
- password

### GuestUser

- id (auto-increment)
- token (indexed key and unique)
- versionNumber (int)
- operation system (string)
- user agent (string)
- display details (string)
- created at (datetime)

### Story

- id (auto-increment)
- creator user id
- type (timed, subscribed)
- from_date (nullable, applicable only for timed stories)
- from_time (nullable, applicable only for timed stories)
- to_date (nullable, applicable only for timed stories)
- to_time (nullable, applicable only for timed stories)
- story_name (required)
- background_color (string of hex or rgb)
- background_image (link to an image)
- is_shareable (default: true)
- attached_file (nullable)
- external_web_link (nullable)
- created_at (datetime)
- updated_at (nullable)

### User_Scanned

- id
- user id
- story id
- datetime

### DeleteUserAccount

- id
- user_id
- datetime

### DeleteGuestAccount

- id
- user_id
- datetime

## GraphQL Operations - Queries

### Login

Allows users to authenticate and obtain a user token.

**Input:**

- email (string)
- password (string)

**Output:**

token (string)

### GetGuestToken

Returns a UUID token for guest users.

**Output:**

token (string)

### AuthAndCheckGuestToken

Verifies the validity of a guest token.

**Input:**

token (string)

**Output:**

isValid (boolean)

### GetStories

Retrieves a list of stories based on the user's role.

**Output:**

stories (array of Story objects)

### GetTimedStories

Retrieves a list of timed stories based on the user's role.

**Output:**

timedStories (array of Story objects)

### GetSubscribedStories

Retrieves a list of subscribed stories based on the user's role.

**Output:**

subscribedStories (array of Story objects)

### GetStory
Retrieves the details of a specific story based on the user's role.

**Input:**

storyId (string)

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

user (User object)

### DeleteAccount

Deactivates a user account and keeps a record of the deletion.

**Output:**

success (boolean)

### ScanStory
Scans a story for a guest user.

**Input:**

- storyId (string)
- token (string)

**Output:**

success (boolean)

### Types

**User**
- id (string)
- name (string)
- email (string)
- password (string)

**GuestUser**

- id (string)
- token (string)
- versionNumber (int)
- operationSystem (string)
- userAgent (string)
- displayDetails (string)
- createdAt (datetime)

**Story**

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

**UserScanned**

- id (string)
- userId (string)
- storyId (string)
- datetime (datetime)
- DeleteUserAccount
- id (string)
- userId (string)
- datetime (datetime)

**DeleteGuestAccount**

- id (string)
- userId (string)
- datetime (datetime)

Copyright 2023, Max Base

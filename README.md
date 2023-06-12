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

Copyright 2023, Max Base

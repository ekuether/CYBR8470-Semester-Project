# CYBR8470-Semester-Project
Semester Project for CYBR8470

## Dungeons and Postman

### Description

This project is focused on helping students learn Postman or similar tools by providing a game that is completed through GET, POST, PUT, and DELETE requests. The learners will have to navigate through a labyrinth to complete the game. Adminstrators will have a webpage to help design the labyrinth and look at the completion among participants.

### Installation Instructions (TODO)

NOTE: Due to the incompleteness of the app, this will not work. These instructions are the "goal" for the current app to eventually acheive.

1. Clone the repository to your local machine

2. Run:
```bash
docker-build .
docker-compose up
```

### Getting Started (TODO)

NOTE: Due to th eincompleteness of the app, this will not work. These instructions are the "goal" for the current app to eventually acheive.

To get started run:
```bash
docker-compose up
```

### License

Copyright 2022 Ethen Kuether

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

## User/Misuser Stories

### User Stories

As an **Instructor**, I want to **view the participant's progress**, so I can **modify the the course to best fit their learning style**
- Criteria: Administrators are able to modify the game board/level

As a **Student**, I want to **easily complete the game**, so I can **finish in a timely manner**
- Criteria: Limit complexity of game by limiting the size of the labyrinth

As a **Student**, I want to **learn HTTP requests**, so I can **apply them to the real world**
- Criteria: Http requests should use JSON format when sending and receiving data

As a **Administrator**, I want to **verify when the game level was created**, so I can **manage the game better**
- Criteria: Add timestamps to creation events

As a **Beta-tester**, I want to **be able to view the entire game level**, so I can **verify that the requests are working**
- Criteria: Add a login for beta-testers into the web page

As an **Administrator**, I want to **add different items/obsticles**, so I can **vary the difficulty of the game**
- Criteria: Have POST/PUT commands for items and obsticles

As an **Instructor**, I want to **put shortcuts in the game**, so I can **teach about vulnerabilities**
- Criteria: Have a set of vulnerabilites instructors/administrators can add to the game as shortcuts. Instructors/Administrators will not be able to create their own vulnerabilities

As an **Administrator**, I want to **verify the game's solvability**, so I can **make sure that the participants solve the game**
- Criteria: Let administrators play as participants

As a **Beta-tester**, I want to **test HTTP requests**, so I can **verify each request is working**
- Criteria: Each request should be well documented, so tests can be carried out

### Misuser Stories

As a **Student**, I want to **Use a friend's account**, so I can **finish quickly without doing anything**
- Criteria: To prevent this, administrators will see exactly who went through the game at what time

As a **Student**, I want to **Automate my game**, so I can **finish without doing much activity**
- Criteria: If students want to automate, then they do know how HTTP requests work. However, if instructors want to forbid automation, then timestamps will be given on when each request was sent

As a **Cheater**, I want to **Exploit vulnerabilites**, so I can **skip sections of the game**
- Criteria: Each HTTP request should be secure, except for the purposeful shortcuts

As a **Cheater**, I want to **Change the game**, so I can **modify the game to how I see fit**
- Criteria: Each game level will have time stamps to show when someone modified the game, and user stamps to show who modified it

As a **Hacker**, I want to **View Profiles**, so I can **retreive personal information**
- Criteria: Safe account management from trusted third-parties will be used to mitigate security vulnerabilities

As a **Cheater**, I want to **Make the game unsolvable**, so I can **get a good grade without doing anything**
- Criteria: Administrators will be able to view if the game is solvable, and timestamps indicating any changes that affect the solvability

## Architecture

This game/learning application will utilize the "PERN" (Postgres, Express, React, Node) full-stack. Postgres will be utilized as the database of choice, the Express package for javascript will be utilized to handle REST API calls, React will be used for the front-end web page, and Node will be used as the backend.

The reason for choosing this stack is that I have seen more resources on Node/Express than Django/Python, or SpringBoot/Java. Postgres was also the database utilized within prior labs, thus I have some material to work off of there. Finally, React is the number one most downloaded frontend framework, thus I'm sure I can find plenty of resources.

NOTE: I have not utilized any of these products regularly. As such, the first few versions can be expected to be full of bugs. 

### Mockups

NOTE: The mockup designs are intended for the administrator web-page interface, most participants will be using Postman or a similar tool

### Architecture

NOTE: The scanned architecture is rough and will be replaced with a digital copy soon

### Milestones

Milestone 1: Get Postgres running and migrate the necessary tables to it

Milestone 2: Get Node/Express up and running and start getting GET requests created

Milestone 3: Create a basic game level and get basic participant API's running

Milestone 4: Add items/obsticles to the game

Milestone 5: Create a basic front end with react

Milestone 6: Add third-party log-in security to the front end

Milestone 7: Connect the front end with existing API's

Milestone 8: TODO

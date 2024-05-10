<h1 align="center">Fit Connect</h1>

<p align="center"> This is an API for a application that allows users to find gyms and check-in at them. 
    <br> 
</p>

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)
- [Structure](#structure)
- [Features](#features)
- [Built Using](#built_using)

## 🧐 About <a name = "about"></a>
- This is an API for a application that allows users to find gyms and check-in at them.
- The API allows users to register, authenticate, find gyms, check-in at gyms, and more.
- The API is built using Node.js, Fastify, Prisma, and PostgreSQL, using SOLID principles and TDD. 

## 🏁 Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
You will need to have the following installed on your machine:
- [Node.js](https://nodejs.org/en/)
- [Docker](https://www.docker.com/)

### Installing
With the prerequisites installed, and with docker running, you can run the following commands to get the project up and running:

1. Clone the repository or download the zip file and extract it:
```bash
git clone https://github.com/LeonardoSPereira/Fit-Connect.git
```

2. Install the dependencies:
```bash
npm install
```

3. Create a `.env` file in the root of the project with the following content:
```env
NODE_ENV=dev

PORT=

DATABASE_URL="postgresql://docker:docker@localhost:5432/fitconnectapi?schema=public"

JWT_SECRET=appjwtsecret
```

4. Start the database:
```bash
docker-compose up -d
```

5. Run the migrations:
```bash
npx prisma migrate dev
```

6. Start the server:
```bash
npm run dev
```

## 🏗️ Structure <a name = "structure"></a>
The project is structured as follows:
```
├── .github: folder where the project's GitHub actions are located.

├── prisma: folder where the Prisma configuration files are located, with the schema and migrations.

├── src: folder where application files are located.

│   ├── @types: folder where jwt types are located.

│   ├── env: folder where environment variables are located.

│   ├── http: folder where are located the folders that contain the routes, controllers with it's e2e tests, and the middlewares. 

│   ├── lib: folder where the files that contain the configuration of the dependencies used in the application are located.

│   ├── repositories: folder where the folders that contain the interfaces, implementations, and the in-memory implementation of the repositories are located.

│   ├── use-cases: folder where are located the application's use cases with it's unit tests, the errors handlers an the factories, that are responsible for abstracting the creation of the use cases.

│   ├──  utils: folder where the files that contain utility functions are located.

│   ├── app.ts: file that contains the application configuration.

│   └── server.ts: file that contains the server configuration.

└── vitest-environment: folder where the environment configuration for the e2e tests is located.

```

## 🔧 Running the tests <a name = "tests"></a>
The tests are divided into unit tests and e2e tests. To run the tests, you can run the following commands:

1. To run the unit tests:
```bash
npm run test
```

2. To run the e2e tests:
```bash
npm run test:e2e
```
*Remember that to run the e2e tests, the database must be running.*

- To run the tests with coverage, you can run the following commands:
```bash
npm run test:coverage
```

### Break down into end to end tests
The e2e tests test the application's routes, controllers, and middlewares, simulating the user's interaction with the application.

## 🎈 Features <a name = "features"></a>

### FRs (Functional Requirements)

- [x] Users must be able to register;
- [x] Users must be able to authenticate;
- [x] Users must be able to retrieve the profile of a logged-in user;
- [x] Users must be able to obtain the number of check-ins performed by the logged-in user;
- [x] Users must be able to retrieve their check-in history;
- [x] Users must be able to search for nearby gyms (until 10km);
- [x] Users must be able to search for gyms by name;
- [x] Users must be able to check in at a gym;
- [x] Users must be able to validate a user's check-in;
- [x] Admins must be able to register a gym;

### BRs (Business Requirements)

- [x] Users must not be able to register with a duplicate email;
- [x] Users cannot check in twice on the same day;
- [x] Users cannot check in if they are not close (100m) to the gym;
- [x] Check-ins can only be validated up to 20 minutes after creation;
- [x] Check-ins can only be validated by admins;
- [x] Gyms can only be registered by admins;

### NFRs (Non-functional Requirements)

- [x] User passwords need to be encrypted;
- [x] Application data must be persisted in a PostgreSQL database;
- [x] All data lists must be paginated with 20 items per page;
- [x] Users must be identified by a JSON Web Token (JWT);


## 🎈 Usage <a name="usage"></a>
To use the API, you can use the following routes:

### Users Routes
```
POST /users - Register a user

POST /sessions - Authenticate a user

GET /me - Retrieve the profile of a logged-in user

PATCH /token/refresh - Refresh the user's JWT token
```

### Gyms Routes
```
POST /gyms - Register a gym (only for admins)

GET /gyms/nearby - Retrieve a list of gyms near the user

GET /gyms/search - Retrieve a list of gyms by name
```

### Check-ins Routes
```
POST /gyms/:gymId/check-ins - Check in at a gym
  - Params: gymId

GET /check-ins/history - Retrieve the check-in history of the logged-in user

GET /check-ins/metrics - Retrieve the number of check-ins performed by the logged-in user

PATCH /check-ins/:checkInId/validate - Validate a user's check-in (only for admins)
  - Params: checkInId
```	

## ⛏️ Built Using <a name = "built_using"></a>
- [TypeScript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/en/)
- [Fastify](https://www.fastify.io/)
- [Prisma](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)
- [Zod](https://zod.dev/)
- [Vitest](https://vitest.dev/)




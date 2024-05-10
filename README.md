# App

GymPass style app.

## FRs (Functional Requirements)

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

## BRs (Business Rules)

- [x] Users must not be able to register with a duplicate email;
- [x] Users cannot check in twice on the same day;
- [x] Users cannot check in if they are not close (100m) to the gym;
- [x] Check-ins can only be validated up to 20 minutes after creation;
- [x] Check-ins can only be validated by admins;
- [x] Gyms can only be registered by admins;

## NFRs (Non-functional Requirements)

- [x] User passwords need to be encrypted;
- [x] Application data must be persisted in a PostgreSQL database;
- [x] All data lists must be paginated with 20 items per page;
- [x] Users must be identified by a JSON Web Token (JWT);

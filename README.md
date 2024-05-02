# App

GymPass style app.

## RFs (Functional Requirements)

- [x] Users must be able to register;
- [ ] Users must be able to authenticate;
- [ ] Users must be able to retrieve the profile of a logged-in user;
- [ ] Users must be able to obtain the number of check-ins performed by the logged-in user;
- [ ] Users must be able to retrieve their check-in history;
- [ ] Users must be able to search for nearby gyms;
- [ ] Users must be able to search for gyms by name;
- [ ] Users must be able to check in at a gym;
- [ ] Users must be able to validate a user's check-in;
- [ ] Admins must be able to register a gym;

## RNs (Business Rules)

- [x] Users must not be able to register with a duplicate email;
- [ ] Users cannot check in twice on the same day;
- [ ] Users cannot check in if they are not close (100m) to the gym;
- [ ] Check-ins can only be validated up to 20 minutes after creation;
- [ ] Check-ins can only be validated by administrators;
- [ ] Gyms can only be registered by administrators;

## RNFs (Non-functional Requirements)

- [x] User passwords need to be encrypted;
- [ ] Application data must be persisted in a PostgreSQL database;
- [ ] All data lists must be paginated with 20 items per page;
- [ ] Users must be identified by a JSON Web Token (JWT);

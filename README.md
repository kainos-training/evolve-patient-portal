# evolve-patient-portal #

## Getting Started ##

This seed project has been created to get you up and running quickly for development and testing on the Evolve patient portal.

For coding standards and additional info please see the project wiki :)

### Database ###
Run script for creation and insertion of mock data to create a local copy of the database.
patientPortalDB.sql

### Prerequisites ###

```
* Node 
* npm
* git
```

Please create a server/.env with the following template (refer to .env.example file):
```
# Express Variables
EXPRESSPORT={EXPRESS_PORT}

# MySQL Variables
MYSQL_USER={USER}
MYSQL_PASSWORD={PASSWORD}
MYSQL_HOST={HOST}
DATABASENAME={DATABASENAME}

# Email Variables
EMAIL={EMAIL}
EMAIL_PASSWORD={PASSWORD}
EMAIL_HOST={HOST}
EMAIL_PORT={PORT}
SECURE={SECURE}

# JWT Variables
JWT_SECRET={JWT_SECRET}
```

### Installing/Running ###
* To start the client side, run the following commands:

```
cd client
npm install
npm run start
```

* To start the server side, run the following commands:
```
cd server
npm install
nodemon index.js
```

### Testing ###
* To run the client side tests, the following commands
```
ng test
```
* To run the server side tests, use the following commands
```
npm run intTest
npm run unitTest
```
